/*
 * @name:
 * @Date: 2020-11-27 17:39:31
 * @LastEditTime: 2020-12-01 16:46:01
 * @FilePath: \fy_erp_vue3\src\utils\bus.ts
 * @permission:
 */
// 为保持和vue2版本中使用bus一致，emit,on,off前面都加了$
class Bus {
	list: { [key: string]: Array<Function> };
	constructor() {
		// 收集订阅信息,调度中心
		this.list = {};
	}

	// 订阅
	$on(name: string, fn: Function) {
		this.list[name] = this.list[name] || [];
		this.list[name].push(fn);
	}

	// 发布
	$emit(name: string, data?: string | boolean) {
		this.list[name].forEach((fn: Function) => {
			fn(data);
		});
	}

	// 取消订阅
	$off(name: string, fn: Function) {
		if (this.list[name]) {
			this.list[name].forEach((item: Function, index: number) => {
				if (item === fn) {
					this.list[name].splice(index, 1);
				}
			});
		}
	}
}
export default Bus;
