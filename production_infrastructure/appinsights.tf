resource "azurerm_application_insights" "main" {
  name                = "${var.prefix}_prod_appinsight"
  location            = var.location
  resource_group_name = azurerm_resource_group.my_resource_group.name
  application_type    = "web"
}
