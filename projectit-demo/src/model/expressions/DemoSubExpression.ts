import { model } from "projectit-model";
import { DemoBinaryExpression } from "./DemoBinaryExpression";

@model
export class DemoSubExpression extends DemoBinaryExpression {
    $type: string = "DemoSubExpression";

    get symbol(): string {
        return "-";
    }

    toString(): string {
        return "DemoSubExpression";
    }

}
