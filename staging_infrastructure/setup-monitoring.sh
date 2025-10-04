#!/bin/bash

# Azure Monitor and Application Insights Setup Script
# This script sets up comprehensive monitoring for the AKS cluster and services

set -e

# Configuration
RESOURCE_GROUP="bang-resource-group"
AKS_CLUSTER_NAME="bang-aks-cluster"
LOCATION="australiaeast"
APP_INSIGHTS_NAME="bang-ecommerce-app"
LOG_ANALYTICS_NAME="bang-log-analytics"

echo "🚀 Setting up Azure Monitor and Application Insights..."

# 1. Create Application Insights (if not exists)
echo "📊 Creating Application Insights..."
az monitor app-insights component create \
    --app $APP_INSIGHTS_NAME \
    --location $LOCATION \
    --resource-group $RESOURCE_GROUP \
    --application-type web \
    --kind web \
    --retention-time 90

# Get Application Insights instrumentation key
APP_INSIGHTS_KEY=$(az monitor app-insights component show \
    --app $APP_INSIGHTS_NAME \
    --resource-group $RESOURCE_GROUP \
    --query instrumentationKey -o tsv)

echo "Application Insights Key: $APP_INSIGHTS_KEY"

# 2. Enable Azure Monitor for containers
echo "🔍 Enabling Azure Monitor for containers..."
az aks enable-addons \
    --resource-group $RESOURCE_GROUP \
    --name $AKS_CLUSTER_NAME \
    --addons monitoring

# 3. Create Log Analytics workspace (if not exists)
echo "📋 Creating Log Analytics workspace..."
az monitor log-analytics workspace create \
    --resource-group $RESOURCE_GROUP \
    --name $LOG_ANALYTICS_NAME \
    --location $LOCATION

WORKSPACE_ID=$(az monitor log-analytics workspace show \
    --resource-group $RESOURCE_GROUP \
    --name $LOG_ANALYTICS_NAME \
    --query id -o tsv)

# 4. Set up diagnostic settings for AKS
echo "⚙️ Setting up diagnostic settings..."
az monitor diagnostic-settings create \
    --name "aks-diagnostics" \
    --resource /subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.ContainerService/managedClusters/$AKS_CLUSTER_NAME \
    --logs '[{"category": "kube-apiserver", "enabled": true}, {"category": "kube-controller-manager", "enabled": true}, {"category": "kube-scheduler", "enabled": true}, {"category": "kube-audit", "enabled": true}]' \
    --metrics '[{"category": "AllMetrics", "enabled": true}]' \
    --workspace $WORKSPACE_ID

# 5. Create metric alerts
echo "🚨 Creating metric alerts..."

# CPU Usage Alert
az monitor metrics alert create \
    --name "High CPU Usage" \
    --resource /subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.ContainerService/managedClusters/$AKS_CLUSTER_NAME \
    --resource-type Microsoft.ContainerService/managedClusters \
    --description "Alert when CPU usage is high" \
    --condition "avg percentage CPU > 80" \
    --window-size 5m \
    --evaluation-frequency 1m \
    --action-group /subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP/providers/microsoft.insights/actionGroups/default-action-group

# Memory Usage Alert
az monitor metrics alert create \
    --name "High Memory Usage" \
    --resource /subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.ContainerService/managedClusters/$AKS_CLUSTER_NAME \
    --resource-type Microsoft.ContainerService/managedClusters \
    --description "Alert when memory usage is high" \
    --condition "avg percentage Memory > 85" \
    --window-size 5m \
    --evaluation-frequency 1m

# Pod Restart Alert
az monitor metrics alert create \
    --name "Pod Restarts" \
    --resource /subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.ContainerService/managedClusters/$AKS_CLUSTER_NAME \
    --resource-type Microsoft.ContainerService/managedClusters \
    --description "Alert when pods are restarting frequently" \
    --condition "avg Pod restarts > 5" \
    --window-size 10m \
    --evaluation-frequency 5m

# 6. Enable Azure Defender for containers
echo "🛡️ Enabling Azure Defender..."
az security pricing create \
    --name ContainerRegistries \
    --tier Standard

az security pricing create \
    --name KubernetesService \
    --tier Standard

# 7. Create Application Insights availability test
echo "🌐 Creating availability test..."
az monitor app-insights web-test create \
    --resource-group $RESOURCE_GROUP \
    --name "frontend-availability-test" \
    --location $LOCATION \
    --app-insights $APP_INSIGHTS_NAME \
    --url "http://frontend/health" \
    --frequency 300 \
    --timeout 30 \
    --expected-http-status-code 200 \
    --kind url-ping

echo "✅ Monitoring setup complete!"
echo ""
echo "📊 Application Insights: https://portal.azure.com/#blade/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/applicationInsights"
echo "📈 Log Analytics: https://portal.azure.com/#blade/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/logs"
echo "🚨 Alerts: https://portal.azure.com/#blade/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/alerts"
echo ""
echo "🔑 Application Insights Key: $APP_INSIGHTS_KEY"