import { observer } from "mobx-react";
import { MainToolbarItem } from "projectit-demo/application/app/MainToolbarComponent";
import * as React from "react";

import { PiEditor, PiToolbarItem, STYLES } from "projectit";

export type MainItemProps = {
    toolbarItem: MainToolbarItem;
};

@observer
export class MainToolbarItemComponent extends React.Component<MainItemProps, {}> {
    render() {
        let innerElement = this.props.toolbarItem.label;
        return (
            <button
                className={STYLES.toolbarItem}
                onClick={this.onClick}
            >
                {innerElement}
            </button>
        );
    }

    private onClick = () => {
        this.props.toolbarItem.onClick();
    };
}
