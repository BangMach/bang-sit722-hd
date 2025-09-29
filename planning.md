# DevOps Pipeline Implementation Plan for Task10_2D

## Overview
This plan outlines the implementation of a comprehensive DevOps pipeline for the Task10_3HD repository, a microservices e-commerce application deployed on Azure Kubernetes Service (AKS). The solution integrates Jenkins pipelines with OpenTofu for infrastructure as code, while maintaining GitHub integration for triggering. The pipeline includes staging (temporary) and production (persistent) environments with automated testing, deployment, and rollback capabilities.

## Implementation Phases

### Phase 1: Infrastructure as Code Setup (Terraform/OpenTofu)
- ✅ Created Terraform configuration for Azure infrastructure
- ✅ Configured Azure Resource Group, ACR, and AKS resources
- ✅ Set up environment-specific variable files (staging.tfvars, production.tfvars)
- ✅ Implemented remote state management for production use
- ✅ Added monitoring and logging components (Log Analytics, Application Insights)

### Phase 2: Staging Deployment (Stage 2)
- ✅ Integrated Jenkins pipeline for CI/CD
- ✅ Configured pipeline to run unit and integration tests using pytest for backend services
- ✅ Mocked Azure Blob Storage for tests
- ✅ Set up Docker Compose for local integration testing of microservices and databases
- ⏳ Next: set up Docker Scout for front end and back end services
- ⏳ Next: set up sonar quebes for front end and back end services
- ⏳ Next: set up synk test


- ⏳ Next: Build Docker images for each service
- ⏳ Next: Scan Docker images using Docker Scout for vulnerabilities and best practices
- ⏳ Optional: Integrate SonarQube for code quality analysis and display results in the pipeline
- ⏳ Next: Push validated images to Azure Container Registry (ACR)
- ⏳ Next: Deploy images to staging AKS using Bicep/Kubernetes manifests
- ⏳ Next: Perform acceptance tests (manual and health checks)
- ⏳ Next: Destroy staging resources after testing

### Phase 3: Production Deployment
- On pull request merge to 'main' branch, trigger a separate workflow.
- Deploy to existing production AKS environment using the latest images from ACR.
- Include rollback on failure (e.g., redeploy previous version).

## Technical Details

### Tools and Technologies
- **CI/CD Platform**: Jenkins (current), GitHub Actions (planned for some workflows)
- **Containerization**: Docker (existing Dockerfiles)
- **Registry**: Azure Container Registry (ACR) for storing images
- **Orchestration**: Azure Kubernetes Service (AKS) with existing Kubernetes manifests
- **Infrastructure as Code**: Terraform (OpenTofu) for Azure resources, Bicep templates for staging resources
- **Secrets Management**: Jenkins Credentials, GitHub Secrets for Azure credentials (use managed identities where possible)
- **Monitoring**: Azure Application Insights for logs and metrics
- **Security**: Azure Defender for containers, vulnerability scans in pipeline (Docker Scout planned)
- **Code Quality**: SonarQube (optional, planned for integration)

### Pipeline Structure
- **Workflow 1 (testing branch)**:
  - Jobs: Test, Build & Push.
  - Test: Run pytest on backend services, mock Azure Blob Storage.
  - Build: Docker build for each service, tag with commit SHA.
  - Scan: Use Docker Scout to check images for vulnerabilities and best practices.
  - Code Quality: (Optional) Run SonarQube analysis and publish code quality results.
  - Push: Upload to ACR.
  - Staging: Create AKS namespace/deployments via Bicep, deploy, test, destroy.
- **Workflow 2 (main branch)**:
  - Job: Deploy to Prod AKS, monitor health.

### Best Practices Incorporated
- Secure access with Azure managed identities.
- Use Bicep for declarative infrastructure.
- Enable Azure Policy for compliance.
- Monitor deployments with Azure Monitor.
- Implement canary or blue-green for Prod if needed.

## Testing Steps

### Unit Testing
- ✅ Pytest-based unit tests for backend services

### Integration Testing
- ✅ In pipeline: Test API endpoints (e.g., product creation, order placement) against local Docker containers.
- ✅ Verify RabbitMQ message publishing/consuming.

### Acceptance Testing (Staging)
- ⏳ Manual: Access frontend, add product, place order, check status updates.
- ⏳ Trivial: API health checks, database connectivity.

### Production Testing
- ⏳ Post-deployment: Automated smoke tests (e.g., via GitHub Actions), monitor Application Insights for errors.
- ⏳ Rollback: If failures detected, redeploy previous image tag.