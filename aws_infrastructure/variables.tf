variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-2"
}

variable "s3_bucket_name" {
  description = "Production S3 bucket name"
  type        = string
  default     = "prod-app-bucket-01"
}

variable "eks_cluster_name" {
  description = "Production EKS cluster name"
  type        = string
  default     = "prod-eks-cluster"
}

variable "eks_role_arn" {
  description = "IAM role ARN for EKS"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs for EKS"
  type        = list(string)
}
