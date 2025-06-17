/**
 * Enum representing product statuses.
 */
export enum ProductStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

/**
 * Status-to-color mapping for UI badges or chips.
 */
export const PRODUCT_STATUS_COLORS: Record<ProductStatus, string> = {
  [ProductStatus.ACTIVE]: "success" as const,
  [ProductStatus.ARCHIVED]: "gray" as const,
};
