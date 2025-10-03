# week06/example-3/variables.tf

variable "prefix" {
  description = "Prefix for all resource names"
  type        = string
  default     = "banghdsit722"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "australiaeast"
}

variable "kubernetes_version" {
  default = "1.31.7"
}
