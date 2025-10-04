provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "prod_rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_storage_account" "prod_storage" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.prod_rg.name
  location                 = azurerm_resource_group.prod_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_kubernetes_cluster" "prod_aks" {
  name                = var.aks_cluster_name
  location            = azurerm_resource_group.prod_rg.location
  resource_group_name = azurerm_resource_group.prod_rg.name
  dns_prefix          = "${var.aks_cluster_name}-dns"

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  kubernetes_version = var.kubernetes_version
}

output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.prod_aks.name
}

output "storage_account_name" {
  value = azurerm_storage_account.prod_storage.name
}
