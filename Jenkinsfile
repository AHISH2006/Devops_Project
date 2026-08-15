pipeline {
    agent any

    environment {
        IMAGE_NAME = 'ahish2006/physio_app'
        DOCKER_REGISTRY = 'https://index.docker.io/v1/'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning GitHub repository...'

                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/AHISH2006/Physio_app.git'
            }
        }

        stage('Build React Application') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'

                    bat 'docker build -t %IMAGE_NAME%:latest .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                bat 'docker push %IMAGE_NAME%:latest'
            }
        }

        stage('Deploy Frontend Container') {
            steps {
                bat 'docker stop physio-app || exit 0'
                bat 'docker rm physio-app || exit 0'
                bat 'docker run -d --name physio-app -p 8081:80 %IMAGE_NAME%:latest'
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline completed successfully!'
        }

        failure {
            echo '❌ Pipeline failed. Check the stage logs.'
        }
    }
}