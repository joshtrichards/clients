import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { OrganizationService } from "@bitwarden/common/abstractions/organization/organization.service.abstraction";
import { Organization } from "@bitwarden/common/models/domain/organization";

import { SecretsManagerLogo } from "./secrets-manager-logo";

@Component({
  selector: "sm-navigation",
  templateUrl: "./navigation.component.html",
})
export class NavigationComponent {
  protected isAdmin$ = this.route.params.pipe(
    map((params) => this.organizationService.get(params.organizationId)?.isAdmin)
  );

  protected readonly logo = SecretsManagerLogo;

  protected orgFilter = (org: Organization) => org.canAccessSecretsManager;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) {}
}
