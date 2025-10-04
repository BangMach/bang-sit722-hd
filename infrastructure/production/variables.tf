variable "resource_group_name" {
  description = "Name of the production resource group"
  type        = string
  default     = "prod-rg"
}

variable "location" {
  description = "Azure region for production resources"
  type        = string
  default     = "Australia East"
}

variable "storage_account_name" {
  description = "Name of the production storage account"
  type        = string
  default     = "prodstorageacct01"
}

variable "aks_cluster_name" {
  description = "Name of the production AKS cluster"
  type        = string
  default     = "prod-aks-cluster"
}

variable "aks_node_count" {
  description = "Number of nodes in the AKS cluster"
  type        = number
  default     = 3
}

variable "kubernetes_version" {
  description = "AKS Kubernetes version"
  type        = string
  default     = "1.27.3"
}
