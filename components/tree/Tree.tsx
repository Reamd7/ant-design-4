import HolderOutlined from '@ant-design/icons/HolderOutlined';
import classNames from 'classnames';
import type { BasicDataNode, TreeProps as RcTreeProps } from 'rc-tree';
import RcTree from 'rc-tree';
import type { DataNode, Key } from 'rc-tree/lib/interface';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import collapseMotion from '../_util/motion';
import dropIndicatorRender from './utils/dropIndicator';
import renderSwitcherIcon from './utils/iconUtil';

export type SwitcherIcon = React.ReactNode | ((props: AntTreeNodeProps) => React.ReactNode);
export type TreeLeafIcon = React.ReactNode | ((props: AntTreeNodeProps) => React.ReactNode);

export interface AntdTreeNodeAttribute {
  eventKey: string;
  prefixCls: string;
  className: string;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  halfChecked: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
  pos: string;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  isLeaf: boolean;
  selectable: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
}

export interface AntTreeNodeProps {
  className?: string;
  checkable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  title?: string | React.ReactNode;
  key?: Key;
  eventKey?: string;
  isLeaf?: boolean;
  checked?: boolean;
  expanded?: boolean;
  loading?: boolean;
  selected?: boolean;
  selectable?: boolean;
  icon?: ((treeNode: AntdTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  children?: React.ReactNode;
  [customProp: string]: any;
}

export interface AntTreeNode extends React.Component<AntTreeNodeProps, {}> { }

export interface AntTreeNodeBaseEvent {
  node: AntTreeNode;
  nativeEvent: MouseEvent;
}

export interface AntTreeNodeCheckedEvent extends AntTreeNodeBaseEvent {
  event: 'check';
  checked?: boolean;
  checkedNodes?: AntTreeNode[];
}

export interface AntTreeNodeSelectedEvent extends AntTreeNodeBaseEvent {
  event: 'select';
  selected?: boolean;
  selectedNodes?: DataNode[];
}

export interface AntTreeNodeExpandedEvent extends AntTreeNodeBaseEvent {
  expanded?: boolean;
}

export interface AntTreeNodeMouseEvent {
  node: AntTreeNode;
  event: React.DragEvent<HTMLElement>;
}

export interface AntTreeNodeDragEnterEvent extends AntTreeNodeMouseEvent {
  expandedKeys: Key[];
}

export interface AntTreeNodeDropEvent {
  node: AntTreeNode;
  dragNode: AntTreeNode;
  dragNodesKeys: Key[];
  dropPosition: number;
  dropToGap?: boolean;
  event: React.MouseEvent<HTMLElement>;
}

// [Legacy] Compatible for v3
export type TreeNodeNormal = DataNode;

type DraggableFn = (node: DataNode) => boolean;

interface DraggableConfig {
  icon?: React.ReactNode | false;
  nodeDraggable?: DraggableFn;
}

export interface TreeProps<T extends BasicDataNode = DataNode>
  extends Omit<
    RcTreeProps<T>,
    'prefixCls' | 'showLine' | 'direction' | 'draggable' | 'icon' | 'switcherIcon'
  > {
  showLine?: boolean | { showLeafIcon: boolean | TreeLeafIcon };
  className?: string;
  /** ?????????????????? */
  multiple?: boolean;
  /** ??????????????????????????? */
  autoExpandParent?: boolean;
  /** Checkable??????????????????????????????????????????????????????????????????????????? */
  checkStrictly?: boolean;
  /** ?????????????????? */
  checkable?: boolean;
  /** ??????????????? */
  disabled?: boolean;
  /** ??????????????????????????? */
  defaultExpandAll?: boolean;
  /** ??????????????????????????? */
  defaultExpandParent?: boolean;
  /** ?????????????????????????????? */
  defaultExpandedKeys?: Key[];
  /** ???????????????????????????????????? */
  expandedKeys?: Key[];
  /** ??????????????????????????????????????? */
  checkedKeys?: Key[] | { checked: Key[]; halfChecked: Key[] };
  /** ????????????????????????????????? */
  defaultCheckedKeys?: Key[];
  /** ???????????????????????????????????? */
  selectedKeys?: Key[];
  /** ???????????????????????? */
  defaultSelectedKeys?: Key[];
  selectable?: boolean;
  /** ????????????????????? */
  filterAntTreeNode?: (node: AntTreeNode) => boolean;
  loadedKeys?: Key[];
  /** ????????????????????????IE>8??? */
  draggable?: DraggableFn | boolean | DraggableConfig;
  style?: React.CSSProperties;
  showIcon?: boolean;
  icon?:
  | ((nodeProps: AntdTreeNodeAttribute) => React.ReactNode)
  | React.ReactNode
  | RcTreeProps<T>['icon'];
  switcherIcon?: SwitcherIcon | RcTreeProps<T>['switcherIcon'];
  prefixCls?: string;
  children?: React.ReactNode;
  blockNode?: boolean;
}

const Tree = React.forwardRef<RcTree, TreeProps>((props, ref) => {
  const { getPrefixCls, direction, virtual } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon = false,
    showLine,
    switcherIcon,
    blockNode = false,
    children,
    checkable = false,
    selectable = true,
    draggable,
    motion = { ...collapseMotion, motionAppear: false },
  } = props;

  const prefixCls = getPrefixCls('tree', customizePrefixCls);

  const newProps = {
    ...props,
    checkable,
    selectable,
    showIcon,
    motion,
    blockNode,
    showLine: Boolean(showLine),
    dropIndicatorRender,
  };

  const draggableConfig = React.useMemo(() => {
    if (!draggable) {
      return false;
    }

    let mergedDraggable: DraggableConfig = {};
    switch (typeof draggable) {
      case 'function':
        mergedDraggable.nodeDraggable = draggable;
        break;
      case 'object':
        mergedDraggable = { ...draggable };
        break;
      default:
        break;
      // Do nothing
    }

    if (mergedDraggable.icon !== false) {
      mergedDraggable.icon = mergedDraggable.icon || <HolderOutlined />;
    }

    return mergedDraggable;
  }, [draggable]);

  return (
    <RcTree
      itemHeight={20}
      ref={ref}
      virtual={virtual}
      {...newProps}
      prefixCls={prefixCls}
      className={classNames(
        {
          [`${prefixCls}-icon-hide`]: !showIcon,
          [`${prefixCls}-block-node`]: blockNode,
          [`${prefixCls}-unselectable`]: !selectable,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
      )}
      direction={direction}
      checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
      selectable={selectable}
      switcherIcon={(nodeProps: AntTreeNodeProps) =>
        renderSwitcherIcon(prefixCls, switcherIcon, showLine, nodeProps)
      }
      draggable={draggableConfig}
    >
      {children}
    </RcTree>
  );
});

export default Tree;
