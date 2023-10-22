
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\App.svelte generated by Svelte v3.59.2 */

    const file = "src\\App.svelte";

    // (73:2) {:else}
    function create_else_block(ctx) {
    	let span0;
    	let t0;
    	let t1;
    	let t2;
    	let span1;
    	let t3;
    	let if_block = /*operators*/ ctx[2] !== null && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			t0 = text(/*fn*/ ctx[0]);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			span1 = element("span");
    			t3 = text(/*sn*/ ctx[1]);
    			attr_dev(span0, "class", "num");
    			add_location(span0, file, 73, 4, 1461);
    			attr_dev(span1, "class", "num");
    			add_location(span1, file, 77, 4, 1582);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, t0);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*fn*/ 1) set_data_dev(t0, /*fn*/ ctx[0]);

    			if (/*operators*/ ctx[2] !== null) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(t2.parentNode, t2);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*sn*/ 2) set_data_dev(t3, /*sn*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(73:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (71:2) {#if Result !== null}
    function create_if_block(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*Result*/ ctx[3]);
    			attr_dev(span, "class", "result");
    			add_location(span, file, 71, 4, 1410);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Result*/ 8) set_data_dev(t, /*Result*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(71:2) {#if Result !== null}",
    		ctx
    	});

    	return block;
    }

    // (75:4) {#if operators !== null}
    function create_if_block_1(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*operators*/ ctx[2]);
    			attr_dev(span, "class", "operator");
    			add_location(span, file, 75, 6, 1526);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*operators*/ 4) set_data_dev(t, /*operators*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(75:4) {#if operators !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let h1;
    	let t1;
    	let div0;
    	let t2;
    	let div1;
    	let button0;
    	let t4;
    	let button1;
    	let t6;
    	let button2;
    	let t8;
    	let button3;
    	let t10;
    	let button4;
    	let t12;
    	let button5;
    	let t14;
    	let button6;
    	let t16;
    	let button7;
    	let t18;
    	let button8;
    	let t20;
    	let button9;
    	let t22;
    	let button10;
    	let t24;
    	let button11;
    	let t26;
    	let button12;
    	let t28;
    	let button13;
    	let t30;
    	let button14;
    	let t32;
    	let button15;
    	let t34;
    	let button16;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*Result*/ ctx[3] !== null) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Calculator by ADARSH SINGH";
    			t1 = space();
    			div0 = element("div");
    			if_block.c();
    			t2 = space();
    			div1 = element("div");
    			button0 = element("button");
    			button0.textContent = "1";
    			t4 = space();
    			button1 = element("button");
    			button1.textContent = "2";
    			t6 = space();
    			button2 = element("button");
    			button2.textContent = "3";
    			t8 = space();
    			button3 = element("button");
    			button3.textContent = "+";
    			t10 = space();
    			button4 = element("button");
    			button4.textContent = "4";
    			t12 = space();
    			button5 = element("button");
    			button5.textContent = "5";
    			t14 = space();
    			button6 = element("button");
    			button6.textContent = "6";
    			t16 = space();
    			button7 = element("button");
    			button7.textContent = "-";
    			t18 = space();
    			button8 = element("button");
    			button8.textContent = "7";
    			t20 = space();
    			button9 = element("button");
    			button9.textContent = "8";
    			t22 = space();
    			button10 = element("button");
    			button10.textContent = "9";
    			t24 = space();
    			button11 = element("button");
    			button11.textContent = "*";
    			t26 = space();
    			button12 = element("button");
    			button12.textContent = "C";
    			t28 = space();
    			button13 = element("button");
    			button13.textContent = "0";
    			t30 = space();
    			button14 = element("button");
    			button14.textContent = ".";
    			t32 = space();
    			button15 = element("button");
    			button15.textContent = "/";
    			t34 = space();
    			button16 = element("button");
    			button16.textContent = "=";
    			add_location(h1, file, 67, 0, 1323);
    			attr_dev(div0, "class", "display");
    			add_location(div0, file, 69, 0, 1360);
    			add_location(button0, file, 82, 2, 1652);
    			add_location(button1, file, 83, 2, 1702);
    			add_location(button2, file, 84, 2, 1752);
    			add_location(button3, file, 85, 2, 1802);
    			add_location(button4, file, 87, 2, 1857);
    			add_location(button5, file, 88, 2, 1907);
    			add_location(button6, file, 89, 2, 1957);
    			add_location(button7, file, 90, 2, 2007);
    			add_location(button8, file, 92, 2, 2062);
    			add_location(button9, file, 93, 2, 2112);
    			add_location(button10, file, 94, 2, 2162);
    			add_location(button11, file, 95, 2, 2212);
    			add_location(button12, file, 97, 2, 2267);
    			add_location(button13, file, 98, 2, 2316);
    			add_location(button14, file, 99, 2, 2366);
    			add_location(button15, file, 100, 2, 2417);
    			add_location(button16, file, 101, 2, 2469);
    			attr_dev(div1, "class", "buttons svelte-1kd5kyg");
    			add_location(div1, file, 81, 0, 1628);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);
    			if_block.m(div0, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, button0);
    			append_dev(div1, t4);
    			append_dev(div1, button1);
    			append_dev(div1, t6);
    			append_dev(div1, button2);
    			append_dev(div1, t8);
    			append_dev(div1, button3);
    			append_dev(div1, t10);
    			append_dev(div1, button4);
    			append_dev(div1, t12);
    			append_dev(div1, button5);
    			append_dev(div1, t14);
    			append_dev(div1, button6);
    			append_dev(div1, t16);
    			append_dev(div1, button7);
    			append_dev(div1, t18);
    			append_dev(div1, button8);
    			append_dev(div1, t20);
    			append_dev(div1, button9);
    			append_dev(div1, t22);
    			append_dev(div1, button10);
    			append_dev(div1, t24);
    			append_dev(div1, button11);
    			append_dev(div1, t26);
    			append_dev(div1, button12);
    			append_dev(div1, t28);
    			append_dev(div1, button13);
    			append_dev(div1, t30);
    			append_dev(div1, button14);
    			append_dev(div1, t32);
    			append_dev(div1, button15);
    			append_dev(div1, t34);
    			append_dev(div1, button16);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button1, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button2, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button3, "click", /*handleOperatorClick*/ ctx[6], false, false, false, false),
    					listen_dev(button4, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button5, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button6, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button7, "click", /*handleOperatorClick*/ ctx[6], false, false, false, false),
    					listen_dev(button8, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button9, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button10, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button11, "click", /*handleOperatorClick*/ ctx[6], false, false, false, false),
    					listen_dev(button12, "click", /*handleClearClick*/ ctx[8], false, false, false, false),
    					listen_dev(button13, "click", /*handleNumberClick*/ ctx[4], false, false, false, false),
    					listen_dev(button14, "click", /*handleDecimalClick*/ ctx[5], false, false, false, false),
    					listen_dev(button15, "click", /*handleOperatorClick*/ ctx[6], false, false, false, false),
    					listen_dev(button16, "click", /*handleEqualClick*/ ctx[7], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			if_block.d();
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let fn = "";
    	let sn = "";
    	let operators = null;
    	let Result = null;

    	function handleNumberClick(event) {
    		if (operators === null) {
    			$$invalidate(0, fn += event.target.innerText);
    		} else {
    			$$invalidate(1, sn += event.target.innerText);
    		}
    	}

    	function handleDecimalClick(event) {
    		if (operators === null && !fn.includes('.')) {
    			$$invalidate(0, fn += event.target.innerText);
    		} else if (operators !== null && !sn.includes('.')) {
    			$$invalidate(1, sn += event.target.innerText);
    		}
    	}

    	function handleOperatorClick(event) {
    		$$invalidate(2, operators = event.target.innerText);
    	}

    	function handleEqualClick() {
    		switch (operators) {
    			case '+':
    				$$invalidate(3, Result = parseFloat(fn) + parseFloat(sn));
    				break;
    			case '-':
    				$$invalidate(3, Result = parseFloat(fn) - parseFloat(sn));
    				break;
    			case '*':
    				$$invalidate(3, Result = parseFloat(fn) * parseFloat(sn));
    				break;
    			case '/':
    				$$invalidate(3, Result = parseFloat(fn) / parseFloat(sn));
    				break;
    		}

    		$$invalidate(0, fn = Result.toString());
    		$$invalidate(1, sn = "");
    		$$invalidate(2, operators = null);
    		$$invalidate(3, Result = null);
    	}

    	function handleClearClick() {
    		$$invalidate(0, fn = "");
    		$$invalidate(1, sn = "");
    		$$invalidate(2, operators = null);
    		$$invalidate(3, Result = null);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		fn,
    		sn,
    		operators,
    		Result,
    		handleNumberClick,
    		handleDecimalClick,
    		handleOperatorClick,
    		handleEqualClick,
    		handleClearClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('fn' in $$props) $$invalidate(0, fn = $$props.fn);
    		if ('sn' in $$props) $$invalidate(1, sn = $$props.sn);
    		if ('operators' in $$props) $$invalidate(2, operators = $$props.operators);
    		if ('Result' in $$props) $$invalidate(3, Result = $$props.Result);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		fn,
    		sn,
    		operators,
    		Result,
    		handleNumberClick,
    		handleDecimalClick,
    		handleOperatorClick,
    		handleEqualClick,
    		handleClearClick
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
