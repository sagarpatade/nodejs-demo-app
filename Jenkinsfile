pipeline {
    agent any

    environment {
        IMAGE_NAME = "sagarpatade1900/nodejs-demo-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sagarpatade/nodejs-demo-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
    steps {
        sh '''
            npm start &
            sleep 5
            npm test
        '''
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
            # Stop any container using port 3000
            docker ps --filter "publish=3000" --format "{{.ID}}" | xargs -r docker stop || true
            docker ps -a --filter "publish=3000" --format "{{.ID}}" | xargs -r docker rm || true

            # Or explicitly stop/remove by name
            docker stop nodejs-demo-app || true
            docker rm nodejs-demo-app || true

            # Run new container
            docker run -d -p 3000:3000 --name nodejs-demo-app $IMAGE_NAME
        '''
    }
}

    }
}
