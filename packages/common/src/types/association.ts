// ==================== 협회 ====================
export interface AssociationBase {
  associationId: number;
  associationName: string;
}

export interface AssociationInfo extends AssociationBase {
  associationMemberCount: number;
  associationProfileImageUrl: string;
}
