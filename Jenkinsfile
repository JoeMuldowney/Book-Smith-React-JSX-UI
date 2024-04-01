pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // Checkout source code
                checkout scm
                
                // Build Docker image
                sh 'docker build -t myfrontendapp .'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy Docker container
                sh 'docker run -d --restart always -p 3000:3000 myfrontendapp'
            }
        }
    }
}
