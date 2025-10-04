# week06/example-3/variables.tf

variable "prefix" {
  description = "Prefix for all resource names"
  type        = string
  default     = "banghdsit722prod"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "australiaeast"
}

variable "kubernetes_version" {
  default = "1.31.7"
}

variable "resource_group_name" {
  description = "Name of the production resource group"
  type        = string
  default     = "banghdsit722prod"

}
