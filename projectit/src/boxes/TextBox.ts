import { observable } from "mobx";
import { PiCaretPosition } from "../util/BehaviorUtils";
import { PiCaret } from "../util/BehaviorUtils";

import { PiElement } from "../language/PiModel";
import { Box } from "./Box";
import { PiUtils } from "../util/PiUtils";

export enum KeyPressAction {
    OK,
    GOTO_NEXT,
    NOT_OK
}

export class TextBox extends Box {
    readonly kind = "TextBox";
    /**
     * If true, the element will be deleted when the text becomes
     * empty because of removing the last character in the text.
     * Usable for e.g. numeric values.
     */
    deleteWhenEmpty: boolean = false;

    /**
     * If true, delete element when Erase key is pressed while the element is empty.
     */
    deleteWhenEmptyAndErase: boolean = false;

    @observable placeHolder: string = "";
    caretPosition: number = -1;
    getText: () => string;
    setText: (newValue: string) => void;
    keyPressAction: (currentText: string, key: string, index: number) => KeyPressAction = () => {
        return KeyPressAction.OK;
    };

    constructor(
        exp: PiElement,
        role: string,
        getText: () => string,
        setText: (text: string) => void,
        initializer?: Partial<TextBox>
    ) {
        super(exp, role);
        PiUtils.initializeObject(this, initializer);
        this.getText = getText;
        this.setText = setText;
    }

    public deleteWhenEmpty1(): boolean {
        return this.deleteWhenEmpty;
    }
    // INTERNAL FUNCTIONS

    /** @internal
     */
    setCaret: (caret: PiCaret) => void = (caret: PiCaret) => {
        console.log("TEXTBOX SETCARET EMPTY");
        /* To be overwritten by `TextComponent` */
        switch (caret.position) {
            case PiCaretPosition.RIGHT_MOST:
                this.caretPosition = this.getText().length;
                break;
            case PiCaretPosition.LEFT_MOST:
                this.caretPosition = 0;
                break;
            case PiCaretPosition.INDEX:
                this.caretPosition = caret.index;
                break;
            case PiCaretPosition.UNSPECIFIED:
                break;
            default:
                break;
        }
    };

    /** @internal
     * This function is called after the text changes in the browser.
     * It ensures that the SelectableComponent will calculate the new coordinates.
     */
    update: () => void = () => {
        /* To be overwritten by `TextComponent` */
    };

    isEditable(): boolean {
        return true;
    }
}

export function isTextBox(b: Box): b is TextBox {
    return b instanceof TextBox;
}
