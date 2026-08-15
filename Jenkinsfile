pipeline {
    agent any

    environment {
        FRONTEND_IMAGE  = 'ahish2006/devops-frontend'
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

        stage('Lint & Check') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Build React Production Artifact') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:${BUILD_NUMBER}", "-f Dockerfile .")
                    docker.build("${FRONTEND_IMAGE}:latest", "-f Dockerfile .")
                }
            }
        }

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

    }

    post {
        success {
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
