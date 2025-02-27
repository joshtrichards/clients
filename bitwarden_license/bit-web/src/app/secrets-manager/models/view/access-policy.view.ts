export class BaseAccessPolicyView {
  id: string;
  read: boolean;
  write: boolean;
  creationDate: string;
  revisionDate: string;
}

export class UserProjectAccessPolicyView extends BaseAccessPolicyView {
  organizationUserId: string;
  organizationUserName: string;
  grantedProjectId: string;
}

export class UserServiceAccountAccessPolicyView extends BaseAccessPolicyView {
  organizationUserId: string;
  organizationUserName: string;
  grantedServiceAccountId: string;
}

export class GroupProjectAccessPolicyView extends BaseAccessPolicyView {
  groupId: string;
  groupName: string;
  grantedProjectId: string;
}

export class GroupServiceAccountAccessPolicyView extends BaseAccessPolicyView {
  groupId: string;
  groupName: string;
  grantedServiceAccountId: string;
}

export class ServiceAccountProjectAccessPolicyView extends BaseAccessPolicyView {
  serviceAccountId: string;
  serviceAccountName: string;
  grantedProjectId: string;
  grantedProjectName: string;
}

export class ProjectAccessPoliciesView {
  userAccessPolicies: UserProjectAccessPolicyView[];
  groupAccessPolicies: GroupProjectAccessPolicyView[];
  serviceAccountAccessPolicies: ServiceAccountProjectAccessPolicyView[];
}

export class ServiceAccountAccessPoliciesView {
  userAccessPolicies: UserServiceAccountAccessPolicyView[];
  groupAccessPolicies: GroupServiceAccountAccessPolicyView[];
}
