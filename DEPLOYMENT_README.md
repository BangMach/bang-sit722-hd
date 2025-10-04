# CD Pipeline Deployment Guide

This guide explains how to use the Continuous Deployment (CD) pipeline to deploy the e-commerce application to Azure Kubernetes Service (AKS).

## 🚀 Quick Start

### Prerequisites
- Jenkins with Azure CLI and kubectl installed
- Azure credentials configured in Jenkins
- AKS cluster running
- Docker images built and pushed to ACR

### Running the CD Pipeline

1. **Trigger the deployment:**
   ```bash
   # From Jenkins UI or via webhook
   # Pipeline: jenkins/Jenkinsfile.deploy
   ```

2. **Parameters:**
   - `IMAGE_TAG`: Docker image tag (default: `latest`)
   - `ENVIRONMENT`: Deployment environment (default: `staging`)
   - `ROLLBACK_ON_FAILURE`: Auto-rollback on failure (default: `true`)

## 📊 Monitoring & Observability

### Application Insights
- **Dashboard**: https://portal.azure.com/#blade/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/applicationInsights
- **Metrics**: Response times, error rates, dependencies
- **Distributed tracing**: Request flow across services

### Azure Monitor
- **Logs**: Container logs, Kubernetes events
- **Metrics**: CPU, memory, network usage
- **Alerts**: Configured for high CPU/memory usage and pod restarts

### Vulnerability Monitoring
- **Trivy scans**: Automated container image scanning
- **Azure Defender**: Runtime security monitoring
- **Reports**: Generated in `infrastructure/vulnerability-scan.sh`

## ⚖️ Auto-scaling Configuration

### Horizontal Pod Autoscaler (HPA)
- **CPU Threshold**: 70% for backend services, 60% for frontend
- **Memory Threshold**: 80% for backend, 70% for frontend
- **Min/Max Replicas**:
  - Product/Order/Customer: 2-10 replicas
  - Frontend: 3-15 replicas

### Scaling Behavior
- **Scale Up**: Quick response (60s stabilization, 50% increase)
- **Scale Down**: Conservative (300s stabilization, 10% decrease)

## 🔒 Security Features

### Azure Defender
- Container registry scanning
- Kubernetes security monitoring
- Runtime threat detection

### Vulnerability Scanning
```bash
# Run manual vulnerability scan
./infrastructure/vulnerability-scan.sh all

# Generate security report
./infrastructure/vulnerability-scan.sh report
```

## 🏥 Health Checks & Rollback

### Health Validation
- Pod readiness checks
- Service endpoint testing
- Load balancer connectivity

### Rollback Strategy
- Automatic rollback on deployment failure
- Previous version restoration
- Alert notifications

## 📈 Performance Monitoring

### Key Metrics
- Response times (< 500ms target)
- Error rates (< 1% target)
- Throughput (requests per second)
- Resource utilization

### Alerts
- CPU > 80%
- Memory > 85%
- Pod restarts > 5 in 10 minutes
- Service unavailable

## 🔧 Troubleshooting

### Common Issues
1. **Deployment fails**: Check AKS cluster status and credentials
2. **Pods not starting**: Review logs with `kubectl logs`
3. **Auto-scaling not working**: Verify HPA configuration
4. **Monitoring not working**: Check Application Insights key

### Useful Commands
```bash
# Check deployment status
kubectl get deployments
kubectl get pods
kubectl get hpa

# View logs
kubectl logs -l app=product-service
kubectl logs -l app=frontend

# Check auto-scaling
kubectl describe hpa

# View Application Insights
az monitor app-insights component show --app bang-ecommerce-app --resource-group bang-resource-group
```

## 📋 Deployment Checklist

- [ ] CI pipeline completed successfully
- [ ] Docker images pushed to ACR
- [ ] AKS cluster accessible
- [ ] Azure credentials configured
- [ ] Application Insights set up
- [ ] Monitoring alerts configured
- [ ] HPA policies applied
- [ ] Security scanning enabled

## 🎯 Next Steps

1. Test the CD pipeline with a staging deployment
2. Configure production environment variables
3. Set up automated testing post-deployment
4. Implement blue-green deployment strategy
5. Add integration with Azure DevOps for enhanced monitoring