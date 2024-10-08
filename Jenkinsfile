// For Damien's Personal Homelab
pipeline {
    agent any

    environment {
       SONAR_TOKEN = credentials('sonar-analysis')
       SONAR_PROJECT_KEY = 'devsecblueprint.github.io'
       DOCKER_IMAGE_NAME = 'devsecblueprint'
       NEXUS_DOCKER_REGISTRY = '10.0.0.22:8082'
       NEXUS_DOCKER_PUSH_INDEX = '10.0.0.22:8083'
       NEXUS_DOCKER_PUSH_PATH = 'repository/docker-host'
    }

    stages {
        stage('Clone') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'Gitea PAT', url: 'http://10.0.0.22/damien/devsecblueprint.github.io.git']])
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }
        stage('Security Scan'){
            parallel {
                stage('Sonar Scan') {
                    steps {
                        script {
                            try{
                                withSonarQubeEnv(installationName: 'Sonar Server', credentialsId: 'sonar-analysis') {
                                    sh '''
                                    docker run --rm \
                                    -e SONAR_HOST_URL="${SONAR_HOST_URL}" \
                                    -e SONAR_TOKEN="${SONAR_TOKEN}" \
                                    -v "$(pwd):/usr/src" \
                                    ${NEXUS_DOCKER_REGISTRY}/sonarsource/sonar-scanner-cli \
                                    -Dsonar.projectKey="${SONAR_PROJECT_KEY}" \
                                    -Dsonar.qualitygate.wait=true \
                                    -Dsonar.sources=.
                                    '''
                                }
                            } catch (Exception e) {
                                // Handle the error
                                echo "Quality Qate check has failed: ${e}"
                                currentBuild.result = 'UNSTABLE' // Mark the build as unstable instead of failing
                            }
                        }
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh '''
                            trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}
                        '''
                    }
                }
            }
        }
        stage('Publish') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'nexus', passwordVariable: 'NEXUS_PASSWORD', usernameVariable: 'NEXUS_USERNAME')]) {
                        sh """
                        docker login ${NEXUS_DOCKER_PUSH_INDEX} -u $NEXUS_USERNAME -p $NEXUS_PASSWORD
                        docker tag ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} ${NEXUS_DOCKER_PUSH_INDEX}/${NEXUS_DOCKER_PUSH_PATH}/${DOCKER_IMAGE_NAME}:latest
                        docker push ${NEXUS_DOCKER_PUSH_INDEX}/${NEXUS_DOCKER_PUSH_PATH}/${DOCKER_IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }
        stage('Deploy') {
            agent { label 'dsb-node-01' }
            steps {
                script {
                        echo 'Deploying to DSB Node 01'
                        sh '''
                        docker pull ${NEXUS_DOCKER_PUSH_INDEX}/${NEXUS_DOCKER_PUSH_PATH}/${DOCKER_IMAGE_NAME}:latest
                        docker stop ${DOCKER_IMAGE_NAME} || true
                        docker rm ${DOCKER_IMAGE_NAME} || true
                        docker run -d --name ${DOCKER_IMAGE_NAME} -p 8090:80 ${NEXUS_DOCKER_PUSH_INDEX}/${NEXUS_DOCKER_PUSH_PATH}/${DOCKER_IMAGE_NAME}:latest
                        '''
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }

}