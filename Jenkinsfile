pipeline {
    agent any
    tools {nodejs "node"}   
    stages {
        stage('deploy') {
            steps {
                // Checkout source code
                checkout scm
                
                // Build Docker image
                sh 'npm install'
            }
        }
    }
}
