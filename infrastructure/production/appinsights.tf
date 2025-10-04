resource "azurerm_application_insights" "main" {
  name                = "prod-appinsights"
  location            = azurerm_resource_group.prod_rg.location
  resource_group_name = azurerm_resource_group.prod_rg.name
  application_type    = "web"
}
