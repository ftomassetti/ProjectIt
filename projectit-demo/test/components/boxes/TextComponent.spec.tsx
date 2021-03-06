import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { AliasBox, PiEditor, PiLogger, TextBox } from "projectit";
import { TextComponent } from "../../../../projectit/src/components/boxes/TextComponent";

import { DemoActions } from "../../../src/editor/DemoActions";
import { DemoContext } from "../../../src/editor/DemoContext";
import { DemoProjection } from "../../../src/editor/DemoProjection";
import { DemoPlaceholderExpression } from "../../../src/model/expressions/DemoPlaceholderExpression";

// let n = require("./setup");

describe("TextComponent", () => {
    let nextLeaf: AliasBox;
    let text = "hello projectit";
    let editor: PiEditor;
    let textbox: TextBox;

    beforeEach(() => {
        PiLogger.muteAllLogs();
        const context = new DemoContext(new DemoPlaceholderExpression());
        const action = new DemoActions();
        const projection = new DemoProjection();
        editor = new PiEditor(context, projection, action);
        nextLeaf = new AliasBox(context.rootElement, "", "");
        textbox = new TextBox(
            context.rootElement,
            "",
            () => text,
            t => {
                text = t;
            }
        );
    });

    it("should render the given box", () => {
        const component = mount(<TextComponent {...{box: textbox, editor: editor}} />);
        expect(component.text()).toBe(text);
    });

    it("should not be editable and not have focus by default", () => {
        const component = mount(<TextComponent {...{box: textbox, editor: editor}} />);
        expect(hasFocus(component)).toBeFalsy();
    });

    // TODO it.skip gives error message, why?
    // it("should be editable when click", () => {
    //     const component = mount(<TextComponent {...{box: textbox, editor: editor}} />);
    //     component.simulate("click");
    //     expect(hasFocus(component)).toBeTruthy();
    // });
});

function hasFocus(component: ReactWrapper<any, any>): boolean {
    return component.getDOMNode() === document.activeElement;
}
