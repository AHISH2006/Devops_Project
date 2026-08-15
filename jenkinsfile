pipeline {
    agent any

    environment {
        IMAGE_NAME = 'akashessencecore/physio-app'
        DOCKER_REGISTRY = 'docker.io' // Replace with your registry
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                git credentialsId: 'github-credentials',
                    url: 'https://github.com/AkashEssencecore/physio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-password', variable: 'DOCKERHUB_PASS')]) {
                    script {
                        docker.withRegistry("https://${DOCKER_REGISTRY}", 'dockerhub-credentials') {
                            docker.image("${IMAGE_NAME}:latest").push()
                        }
                    }
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'npm run dev'
            }
        }
    }
}
