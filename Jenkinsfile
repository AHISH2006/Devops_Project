pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'ahish2006/devops-frontend'
        BACKEND_IMAGE  = 'ahish2006/devops-backend'
        DOCKER_REGISTRY = 'docker.io'
        GIT_REPO_URL    = 'https://github.com/AHISH2006/Devops_Project.git'
    }

    stages {

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

        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:${BUILD_NUMBER}", "-f Dockerfile .")
                    docker.build("${FRONTEND_IMAGE}:latest", "-f Dockerfile .")
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}:${BUILD_NUMBER}", "-f backend/Dockerfile ./backend")
                    docker.build("${BACKEND_IMAGE}:latest", "-f backend/Dockerfile ./backend")
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'dockerhub-credentials') {
                        // Push frontend with build number tag AND latest
                        docker.image("${FRONTEND_IMAGE}:${BUILD_NUMBER}").push()
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                        // Push backend with build number tag AND latest
                        docker.image("${BACKEND_IMAGE}:${BUILD_NUMBER}").push()
                        docker.image("${BACKEND_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo "Deploying build #${BUILD_NUMBER} using Docker Compose..."
                    sh """
                        docker-compose pull
                        docker-compose up -d --remove-orphans
                        docker-compose ps
                    """
                }
            }
        }

    }

    post {
        success {
            echo "✅ Build #${BUILD_NUMBER} deployed successfully!"
        }
        failure {
            echo "❌ Build #${BUILD_NUMBER} failed. Check the logs above."
        }
        always {
            sh 'docker image prune -f || true'
        }
    }
}
