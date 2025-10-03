output "resource_group_name" {
  value = azurerm_resource_group.prod_rg.name
}

output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.prod_aks.name
}

output "storage_account_name" {
  value = azurerm_storage_account.prod_storage.name
}
