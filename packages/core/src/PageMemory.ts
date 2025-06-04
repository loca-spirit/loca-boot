interface IRouterTreeChildRen {
  identifier: string
}

interface IRouterTree {
  identifier: string
  parent?: string
  children?: IRouterTreeChildRen[]
}

export class PageMemory {
  public cacheNode: string[] = []
  public routerTree: IRouterTree[] = []
  private menuMap = {} as any

  public init(routerTree: IRouterTree[]) {
    this.routerTree = routerTree

    this.routerTree.forEach((item) => {
      item.parent = undefined
      if (item.children && item.children.length) {
        this.toListMenu(item)
      }
      this.menuMap[item.identifier] = item
    })
  }

  public cachePageNode(name: string | undefined) {
    if (name) {
      // @ts-ignore
      const cacheNode = this.cacheNode
      const index = cacheNode.indexOf(name)
      if (!this.isRootMenu(name)) {
        if (index === -1) {
          if (cacheNode.length === 1 && this.isMemberInChain(cacheNode[cacheNode.length - 1], name)) {
            cacheNode.splice(index, 1)
          }
          cacheNode.push(name)
        } else {
          cacheNode.splice(index + 1, cacheNode.length - index - 1)
        }
      } else {
        cacheNode.splice(0, cacheNode.length)
        cacheNode.push(name)
      }
    } else {
      // tslint:disable-next-line:no-console
      console.error('page do not set the name!')
    }
  }

  private isRootMenu(name: string | undefined) {
    if (!name) {
      return false
    }
    let isLevelOne = false
    this.routerTree.forEach((item) => {
      if (item.identifier === name) {
        isLevelOne = true
      }
    })
    return isLevelOne
  }

  private isMemberInChain(name: string | undefined, parent: string | undefined) {
    if (!name || !parent) {
      return false
    }
    if (!this.menuMap[name] || !this.menuMap[name].parent) {
      return false
    }
    const parentArr = [] as any[]
    const chains = this.getMemberChain(parentArr, this.menuMap[name])
    return chains.indexOf(parent) > -1
  }

  private getMemberChain(parentArr: any[], item: any): string[] {
    if (item.parent) {
      this.getMemberChain(parentArr, item.parent)
    }
    parentArr.push(item.identifier)
    return parentArr
  }

  private toListMenu(menu: any) {
    menu.children.forEach((item: any) => {
      item.parent = menu
      if (item.children && item.children.length) {
        this.toListMenu(item)
      }
      this.menuMap[item.identifier] = item
    })
  }
}
