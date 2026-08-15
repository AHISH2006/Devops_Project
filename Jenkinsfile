pipeline {
    agent any

    environment {
        IMAGE_NAME = 'ahish2006/physio_app'
    }

    stages {

        stage('Build React Application') {
            steps {
                echo 'Installing dependencies and building React application...'

                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'

                script {
                    bat "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Docker Image Test') {
            steps {
                echo 'Docker image created successfully.'

                bat 'docker images'
            }
        }
    }

    post {
        success {
            echo 'CI Pipeline completed successfully!'
        }

        failure {
            echo 'CI Pipeline failed. Check the console output.'
        }
    }
}