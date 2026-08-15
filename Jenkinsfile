pipeline {
    agent any

    environment {
<<<<<<< HEAD
        IMAGE_NAME = 'ahish2006/physio_app'
=======
        FRONTEND_IMAGE  = 'ahish2006/devops-frontend'
        DOCKER_REGISTRY = 'docker.io'
        GIT_REPO_URL    = 'https://github.com/AHISH2006/Devops_Project.git'
>>>>>>> bf55af404b7a7e2901306f7994de85321248f35c
    }

    stages {

<<<<<<< HEAD
        stage('Build React Application') {
            steps {
                echo 'Installing dependencies and building React application...'

                bat 'npm install'
                bat 'npm run build'
=======
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: "${GIT_REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint & Check') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Build React Production Artifact') {
            steps {
                sh 'npm run build'
>>>>>>> bf55af404b7a7e2901306f7994de85321248f35c
            }
        }

        stage('Build Docker Image') {
            steps {
<<<<<<< HEAD
                echo 'Building Docker image...'

                script {
                    bat "docker build -t ${IMAGE_NAME}:latest ."
=======
                script {
                    docker.build("${FRONTEND_IMAGE}:${BUILD_NUMBER}", "-f Dockerfile .")
                    docker.build("${FRONTEND_IMAGE}:latest", "-f Dockerfile .")
>>>>>>> bf55af404b7a7e2901306f7994de85321248f35c
                }
            }
        }

<<<<<<< HEAD
        stage('Docker Image Test') {
            steps {
                echo 'Docker image created successfully.'

                bat 'docker images'
            }
        }
=======
        stage('Push Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'dockerhub-credentials') {
                        docker.image("${FRONTEND_IMAGE}:${BUILD_NUMBER}").push()
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy Frontend Container') {
            steps {
                script {
                    echo "Deploying Frontend build #${BUILD_NUMBER}..."
                    sh """
                        docker stop devops-frontend || true
                        docker rm devops-frontend || true
                        docker run -d --name devops-frontend -p 80:80 ${FRONTEND_IMAGE}:latest
                    """
                }
            }
        }

>>>>>>> bf55af404b7a7e2901306f7994de85321248f35c
    }

    post {
        success {
<<<<<<< HEAD
            echo 'CI Pipeline completed successfully!'
        }

        failure {
            echo 'CI Pipeline failed. Check the console output.'
        }
    }
}
=======
            echo "✅ Frontend Build #${BUILD_NUMBER} deployed successfully!"
        }
        failure {
            echo "❌ Frontend Build #${BUILD_NUMBER} failed. Check logs above."
        }
        always {
            sh 'docker image prune -f || true'
        }
    }
}
>>>>>>> bf55af404b7a7e2901306f7994de85321248f35c
