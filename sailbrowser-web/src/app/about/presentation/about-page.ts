import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { AboutItem } from "./about-item";
import { MatExpansionModule } from "@angular/material/expansion";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { Toolbar } from 'app/shared/components/toolbar';

@Component({
    selector: "app-about",
    templateUrl: "./about-page.html",
    styleUrls: ["./about-page.scss"],
    imports: [Toolbar, FlexModule, MatExpansionModule, AboutItem],
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class AboutComponent {
}
