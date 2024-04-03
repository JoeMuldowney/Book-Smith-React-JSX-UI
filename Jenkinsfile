pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // Checkout source code
                checkout scm
                
                // Build Docker image
                sh 'docker build -t myapp .'
            }
        }
        stage('Deploy') {
            steps {
                // Save Docker image
                sh 'docker save myapp -o myapp.tar'
                
                // Load Docker image
                sh 'docker load -i myapp.tar'
                
                // Run Docker container
                sh 'docker run -d -p 3000:3000 myapp'
            }
        }
    }
}
