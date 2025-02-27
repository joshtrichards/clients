import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatestWith, map, Observable, startWith, Subject, switchMap, takeUntil } from "rxjs";

import { SelectItemView } from "@bitwarden/components/src/multi-select/models/select-item-view";

import { ServiceAccountProjectAccessPolicyView } from "../../models/view/access-policy.view";
import { AccessPolicyService } from "../../shared/access-policies/access-policy.service";
import {
  AccessSelectorComponent,
  AccessSelectorRowView,
} from "../../shared/access-policies/access-selector.component";

@Component({
  selector: "sm-service-account-projects",
  templateUrl: "./service-account-projects.component.html",
})
export class ServiceAccountProjectsComponent {
  private destroy$ = new Subject<void>();
  private serviceAccountId: string;
  private organizationId: string;

  protected rows$: Observable<AccessSelectorRowView[]> =
    this.accessPolicyService.serviceAccountGrantedPolicyChanges$.pipe(
      startWith(null),
      combineLatestWith(this.route.params),
      switchMap(([_, params]) =>
        this.accessPolicyService.getGrantedPolicies(params.serviceAccountId, params.organizationId)
      ),
      map((policies) => {
        return policies.map((policy) => {
          return {
            type: "project",
            name: policy.grantedProjectName,
            id: policy.grantedProjectId,
            accessPolicyId: policy.id,
            read: policy.read,
            write: policy.write,
            icon: AccessSelectorComponent.projectIcon,
            static: true,
          } as AccessSelectorRowView;
        });
      })
    );

  protected handleCreateAccessPolicies(selected: SelectItemView[]) {
    const serviceAccountProjectAccessPolicyView = selected
      .filter((selection) => AccessSelectorComponent.getAccessItemType(selection) === "project")
      .map((filtered) => {
        const view = new ServiceAccountProjectAccessPolicyView();
        view.serviceAccountId = this.serviceAccountId;
        view.grantedProjectId = filtered.id;
        view.read = true;
        view.write = false;
        return view;
      });

    return this.accessPolicyService.createGrantedPolicies(
      this.organizationId,
      this.serviceAccountId,
      serviceAccountProjectAccessPolicyView
    );
  }

  constructor(private route: ActivatedRoute, private accessPolicyService: AccessPolicyService) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.organizationId = params.organizationId;
      this.serviceAccountId = params.serviceAccountId;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
