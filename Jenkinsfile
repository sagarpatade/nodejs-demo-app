pipeline {
    agent any

    environment {
        IMAGE_NAME = "sagarpatade1900/nodejs-demo-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/sagarpatade/nodejs-demo-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    # Kill process using port 3000 if running
                    fuser -k 3000/tcp || true

                    # Stop and remove existing containers using port 3000
                    docker ps --filter "publish=3000" --format "{{.ID}}" | xargs -r docker stop || true
                    docker ps -a --filter "publish=3000" --format "{{.ID}}" | xargs -r docker rm || true

                    # Stop and remove container by name (if exists)
                    docker stop nodejs-demo-app || true
                    docker rm nodejs-demo-app || true

                    # Run new container
                    docker run -d -p 3000:3000 --name nodejs-demo-app $IMAGE_NAME
                '''
            }
        }
    }
}
