pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code checkout completed by Jenkins'
            }
        }

        stage('Validate') {
            steps {
                sh '''
                    echo "===== Docker Version ====="
                    docker --version

                    echo "===== Docker Compose Version ====="
                    docker compose version

                    echo "===== Project Files ====="
                    ls -la
                '''
            }
        }

        stage('Build Database Image') {
            steps {
                sh '''
                    echo "===== Building Database Image ====="

                    docker build \
                      -t three-tier-database:${BUILD_NUMBER} \
                      ./database
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                    echo "===== Building Backend Image ====="

                    docker build \
                      -t three-tier-backend:${BUILD_NUMBER} \
                      ./backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                    echo "===== Building Frontend Image ====="

                    docker build \
                      -t three-tier-frontend:${BUILD_NUMBER} \
                      ./frontend
                '''
            }
        }

        stage('Verify Images') {
            steps {
                sh '''
                    echo "===== Docker Images ====="

                    docker images | grep three-tier
                '''
            }
        }
    }

    post {

        success {
            echo '===== CI PIPELINE SUCCESS ====='
        }

        failure {
            echo '===== CI PIPELINE FAILED ====='
        }
    }
}
