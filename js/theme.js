/*!echo-js v1.7.3 | (c) 2016 @toddmotto | https://github.com/toddmotto/echo*/ ! function(t, e) {
    "function" == typeof define && define.amd ? define(function() {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e : t.echo = e(t)
}(this, function(t) {
    "use strict";
    var e, n, o, r, c, a = {},
        u = function() {},
        d = function(t) {
            return null === t.offsetParent
        },
        i = function(t, e) {
            if (d(t)) return !1;
            var n = t.getBoundingClientRect();
            return n.right >= e.l && n.bottom >= e.t && n.left <= e.r && n.top <= e.b
        },
        l = function() {
            (r || !n) && (clearTimeout(n), n = setTimeout(function() {
                a.render(), n = null
            }, o))
        };
    return a.init = function(n) {
        n = n || {};
        var d = n.offset || 0,
            i = n.offsetVertical || d,
            f = n.offsetHorizontal || d,
            s = function(t, e) {
                return parseInt(t || e, 10)
            };
        e = {
            t: s(n.offsetTop, i),
            b: s(n.offsetBottom, i),
            l: s(n.offsetLeft, f),
            r: s(n.offsetRight, f)
        }, o = s(n.throttle, 250), r = n.debounce !== !1, c = !!n.unload, u = n.callback || u, a.render(), document.addEventListener ? (t.addEventListener("scroll", l, !1), t.addEventListener("load", l, !1)) : (t.attachEvent("onscroll", l), t.attachEvent("onload", l))
    }, a.render = function() {
        for (var n, o, r = document.querySelectorAll("img[data-echo], [data-echo-background]"), d = r.length, l = {
                l: 0 - e.l,
                t: 0 - e.t,
                b: (t.innerHeight || document.documentElement.clientHeight) + e.b,
                r: (t.innerWidth || document.documentElement.clientWidth) + e.r
            }, f = 0; d > f; f++) o = r[f], i(o, l) ? (c && o.setAttribute("data-echo-placeholder", o.src), null !== o.getAttribute("data-echo-background") ? o.style.backgroundImage = "url(" + o.getAttribute("data-echo-background") + ")" : o.src = o.getAttribute("data-echo"), c || (o.removeAttribute("data-echo"), o.removeAttribute("data-echo-background")), u(o, "load")) : c && (n = o.getAttribute("data-echo-placeholder")) && (null !== o.getAttribute("data-echo-background") ? o.style.backgroundImage = "url(" + n + ")" : o.src = n, o.removeAttribute("data-echo-placeholder"), u(o, "unload"));
        d || a.detach()
    }, a.detach = function() {
        document.removeEventListener ? t.removeEventListener("scroll", l) : t.detachEvent("onscroll", l), clearTimeout(n)
    }, a
});
(function(c) {
    "function" === typeof define && define.amd ? define(["jquery"], c) : "object" === typeof exports ? c(require("jquery")) : c(jQuery)
})(function(c) {
    function h(a, b, e) {
        b = {
            content: {
                message: "object" == typeof b ? b.message : b,
                title: b.title ? b.title : "",
                icon: b.icon ? b.icon : "",
                url: b.url ? b.url : "#",
                target: b.target ? b.target : "-"
            }
        };
        e = c.extend(!0, {}, b, e);
        this.settings = c.extend(!0, {}, g, e);
        this._defaults = g;
        "-" == this.settings.content.target && (this.settings.content.target = this.settings.url_target);
        this.animations = {
            start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
            end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
        };
        "number" == typeof this.settings.offset && (this.settings.offset = {
            x: this.settings.offset,
            y: this.settings.offset
        });
        this.init()
    }
    var g = {
        element: "body",
        position: null,
        type: "info",
        allow_dismiss: !0,
        newest_on_top: !1,
        showProgressbar: !1,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5E3,
        timer: 1E3,
        url_target: "_blank",
        mouse_over: null,
        animate: {
            enter: "animated fadeInDown",
            exit: "animated fadeOutUp"
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: "class",
        template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>',
        PM_exitAnimationTimeout: 0
    };
    String.format = function() {
        for (var a = arguments[0], b = 1; b < arguments.length; b++) a = a.replace(RegExp("\\{" + (b - 1) + "\\}", "gm"), arguments[b]);
        return a
    };
    c.extend(h.prototype, {
        init: function() {
            var a = this;
            this.buildNotify();
            this.settings.content.icon && this.setIcon();
            "#" != this.settings.content.url && this.styleURL();
            this.placement();
            this.bind();
            this.notify = {
                $ele: this.$ele,
                update: function(b, c) {
                    var d = {};
                    "string" == typeof b ? d[b] = c : d = b;
                    for (b in d) switch (b) {
                        case "type":
                            this.$ele.removeClass("alert-" +
                                a.settings.type);
                            this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + a.settings.type);
                            a.settings.type = d[b];
                            this.$ele.addClass("alert-" + d[b]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-" + d[b]);
                            break;
                        case "icon":
                            var f = this.$ele.find('[data-notify="icon"]');
                            "class" == a.settings.icon_type.toLowerCase() ? f.removeClass(a.settings.content.icon).addClass(d[b]) : (f.is("img") || f.find("img"), f.attr("src", d[b]));
                            break;
                        case "progress":
                            this.$ele.data("notify-delay", a.settings.delay - d[b] / 100 * a.settings.delay);
                            this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", d[b]).css("width", d[b] + "%");
                            break;
                        case "url":
                            this.$ele.find('[data-notify="url"]').attr("href", d[b]);
                            break;
                        case "target":
                            this.$ele.find('[data-notify="url"]').attr("target", d[b]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + b + '"]').html(d[b])
                    }
                    d = this.$ele.outerHeight() + parseInt(a.settings.spacing) + parseInt(a.settings.offset.y);
                    a.reposition(d)
                },
                close: function() {
                    a.close()
                }
            }
        },
        buildNotify: function() {
            var a = this.settings.content;
            this.$ele = c(String.format(this.settings.template, this.settings.type, a.title, a.message, a.url, a.target));
            this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align);
            this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none");
            (0 >= this.settings.delay && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
        },
        setIcon: function() {
            "class" == this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
        },
        styleURL: function() {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                height: "100%",
                left: "0px",
                position: "absolute",
                top: "0px",
                width: "100%",
                zIndex: this.settings.z_index + 1
            });
            this.$ele.find('[data-notify="dismiss"]').css({
                position: "absolute",
                right: "10px",
                top: "5px",
                zIndex: this.settings.z_index + 2
            })
        },
        placement: function() {
            var a = this,
                b = this.settings.offset.y,
                e = {
                    display: "inline-block",
                    margin: "0px auto",
                    position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                    transition: "all .5s ease-in-out",
                    zIndex: this.settings.z_index
                },
                d = !1,
                f = this.settings;
            c('[data-notify-position="' +
                this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function() {
                return b = Math.max(b, parseInt(c(this).css(f.placement.from)) + parseInt(c(this).outerHeight()) + parseInt(f.spacing))
            });
            1 == this.settings.newest_on_top && (b = this.settings.offset.y);
            e[this.settings.placement.from] = b + "px";
            switch (this.settings.placement.align) {
                case "left":
                case "right":
                    e[this.settings.placement.align] = this.settings.offset.x + "px";
                    break;
                case "center":
                    e.left = 0, e.right = 0
            }
            this.$ele.css(e).addClass(this.settings.animate.enter);
            c.each(["webkit", "moz", "o", "ms", ""], function(b, c) {
                a.$ele[0].style[c + "AnimationIterationCount"] = 1
            });
            c(this.settings.element).append(this.$ele);
            1 == this.settings.newest_on_top && (b = parseInt(b) + parseInt(this.settings.spacing) + this.$ele.outerHeight(), this.reposition(b));
            c.isFunction(a.settings.onShow) && a.settings.onShow.call(this.$ele);
            this.$ele.one(this.animations.start, function(a) {
                d = !0
            }).one(this.animations.end, function(b) {
                c.isFunction(a.settings.onShown) && a.settings.onShown.call(this)
            });
            setTimeout(function() {
                d || c.isFunction(a.settings.onShown) && a.settings.onShown.call(this)
            }, a.settings.PM_exitAnimationTimeout)
        },
        bind: function() {
            var a = this;
            this.$ele.find('[data-notify="dismiss"]').on("click", function() {
                a.close()
            });
            this.$ele.mouseover(function(a) {
                c(this).data("data-hover", "true")
            }).mouseout(function(a) {
                c(this).data("data-hover", "false")
            });
            this.$ele.data("data-hover", "false");
            if (0 < this.settings.delay) {
                a.$ele.data("notify-delay", a.settings.delay);
                var b = setInterval(function() {
                    var c = parseInt(a.$ele.data("notify-delay")) -
                        a.settings.timer;
                    if ("false" === a.$ele.data("data-hover") && "pause" == a.settings.mouse_over || "pause" != a.settings.mouse_over) {
                        var d = (a.settings.delay - c) / a.settings.delay * 100;
                        a.$ele.data("notify-delay", c);
                        a.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", d).css("width", d + "%")
                    }
                    c <= -a.settings.timer && (clearInterval(b), a.close())
                }, a.settings.timer)
            }
        },
        close: function() {
            var a = this,
                b = parseInt(this.$ele.css(this.settings.placement.from)),
                e = !1;
            this.$ele.data("closing", "true").addClass(this.settings.animate.exit);
            a.reposition(b);
            c.isFunction(a.settings.onClose) && a.settings.onClose.call(this.$ele);
            this.$ele.one(this.animations.start, function(a) {
                e = !0
            }).one(this.animations.end, function(b) {
                c(this).remove();
                c.isFunction(a.settings.onClosed) && a.settings.onClosed.call(this)
            });
            setTimeout(function() {
                if (!e && (a.$ele.remove(), a.settings.onClosed)) a.settings.onClosed(a.$ele)
            }, a.settings.PM_exitAnimationTimeout)
        },
        reposition: function(a) {
            var b = this,
                e = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align +
                '"]:not([data-closing="true"])',
                d = this.$ele.nextAll(e);
            1 == this.settings.newest_on_top && (d = this.$ele.prevAll(e));
            d.each(function() {
                c(this).css(b.settings.placement.from, a);
                a = parseInt(a) + parseInt(b.settings.spacing) + c(this).outerHeight()
            })
        }
    });
    c.notify = function(a, b) {
        return (new h(this, a, b)).notify
    };
    c.notifyDefaults = function(a) {
        return g = c.extend(!0, {}, g, a)
    };
    c.notifyClose = function(a) {
        "undefined" === typeof a || "all" == a ? c("[data-notify]").find('[data-notify="dismiss"]').trigger("click") : c('[data-notify-position="' +
            a + '"]').find('[data-notify="dismiss"]').trigger("click")
    }
});
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
    function n(e) {
        return e
    }

    function o(e) {
        return decodeURIComponent(e.replace(t, " "))
    }

    function i(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return r.json ? JSON.parse(e) : e
        } catch (n) {}
    }
    var t = /\+/g,
        r = e.cookie = function(t, c, a) {
            if (void 0 !== c) {
                if (a = e.extend({}, r.defaults, a), "number" == typeof a.expires) {
                    var u = a.expires,
                        f = a.expires = new Date;
                    f.setDate(f.getDate() + u)
                }
                return c = r.json ? JSON.stringify(c) : String(c), document.cookie = [r.raw ? t : encodeURIComponent(t), "=", r.raw ? c : encodeURIComponent(c), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
            }
            for (var d = r.raw ? n : o, p = document.cookie.split("; "), s = t ? void 0 : {}, m = 0, x = p.length; x > m; m++) {
                var l = p[m].split("="),
                    g = d(l.shift()),
                    v = d(l.join("="));
                if (t && t === g) {
                    s = i(v);
                    break
                }
                t || (s[g] = i(v))
            }
            return s
        };
    r.defaults = {}, e.removeCookie = function(n, o) {
        return void 0 !== e.cookie(n) ? (e.cookie(n, "", e.extend({}, o, {
            expires: -1
        })), !0) : !1
    }
});
(function(c) {
    c.extend(c.fn, {
        validate: function(a) {
            if (this.length) {
                var b = c.data(this[0], "validator");
                if (b) return b;
                this.attr("novalidate", "novalidate");
                b = new c.validator(a, this[0]);
                c.data(this[0], "validator", b);
                if (b.settings.onsubmit) {
                    a = this.find("input, button");
                    a.filter(".cancel").click(function() {
                        b.cancelSubmit = true
                    });
                    b.settings.submitHandler && a.filter(":submit").click(function() {
                        b.submitButton = this
                    });
                    this.submit(function(d) {
                        function e() {
                            if (b.settings.submitHandler) {
                                if (b.submitButton) var f = c("<input type='hidden'/>").attr("name", b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);
                                b.settings.submitHandler.call(b, b.currentForm);
                                b.submitButton && f.remove();
                                return false
                            }
                            return true
                        }
                        b.settings.debug && d.preventDefault();
                        if (b.cancelSubmit) {
                            b.cancelSubmit = false;
                            return e()
                        }
                        if (b.form()) {
                            if (b.pendingRequest) {
                                b.formSubmitted = true;
                                return false
                            }
                            return e()
                        } else {
                            b.focusInvalid();
                            return false
                        }
                    })
                }
                return b
            } else a && a.debug && window.console && console.warn("nothing selected, can't validate, returning nothing")
        },
        valid: function() {
            if (c(this[0]).is("form")) return this.validate().form();
            else {
                var a = true,
                    b = c(this[0].form).validate();
                this.each(function() {
                    a &= b.element(this)
                });
                return a
            }
        },
        removeAttrs: function(a) {
            var b = {},
                d = this;
            c.each(a.split(/\s/), function(e, f) {
                b[f] = d.attr(f);
                d.removeAttr(f)
            });
            return b
        },
        rules: function(a, b) {
            var d = this[0];
            if (a) {
                var e = c.data(d.form, "validator").settings,
                    f = e.rules,
                    g = c.validator.staticRules(d);
                switch (a) {
                    case "add":
                        c.extend(g, c.validator.normalizeRule(b));
                        f[d.name] = g;
                        if (b.messages) e.messages[d.name] = c.extend(e.messages[d.name], b.messages);
                        break;
                    case "remove":
                        if (!b) {
                            delete f[d.name];
                            return g
                        }
                        var h = {};
                        c.each(b.split(/\s/), function(j, i) {
                            h[i] = g[i];
                            delete g[i]
                        });
                        return h
                }
            }
            d = c.validator.normalizeRules(c.extend({}, c.validator.metadataRules(d), c.validator.classRules(d), c.validator.attributeRules(d), c.validator.staticRules(d)), d);
            if (d.required) {
                e = d.required;
                delete d.required;
                d = c.extend({
                    required: e
                }, d)
            }
            return d
        }
    });
    c.extend(c.expr[":"], {
        blank: function(a) {
            return !c.trim("" + a.value)
        },
        filled: function(a) {
            return !!c.trim("" + a.value)
        },
        unchecked: function(a) {
            return !a.checked
        }
    });
    c.validator = function(a, b) {
        this.settings = c.extend(true, {}, c.validator.defaults, a);
        this.currentForm = b;
        this.init()
    };
    c.validator.format = function(a, b) {
        if (arguments.length == 1) return function() {
            var d = c.makeArray(arguments);
            d.unshift(a);
            return c.validator.format.apply(this, d)
        };
        if (arguments.length > 2 && b.constructor != Array) b = c.makeArray(arguments).slice(1);
        if (b.constructor != Array) b = [b];
        c.each(b, function(d, e) {
            a = a.replace(RegExp("\\{" + d + "\\}", "g"), e)
        });
        return a
    };
    c.extend(c.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: c([]),
            errorLabelContainer: c([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function(a) {
                this.lastActive = a;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass);
                    this.addWrapper(this.errorsFor(a)).hide()
                }
            },
            onfocusout: function(a) {
                if (!this.checkable(a) && (a.name in this.submitted || !this.optional(a))) this.element(a)
            },
            onkeyup: function(a) {
                if (a.name in this.submitted || a == this.lastElement) this.element(a)
            },
            onclick: function(a) {
                if (a.name in this.submitted) this.element(a);
                else a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(a, b, d) {
                a.type === "radio" ? this.findByName(a.name).addClass(b).removeClass(d) : c(a).addClass(b).removeClass(d)
            },
            unhighlight: function(a, b, d) {
                a.type === "radio" ? this.findByName(a.name).removeClass(b).addClass(d) : c(a).removeClass(b).addClass(d)
            }
        },
        setDefaults: function(a) {
            c.extend(c.validator.defaults, a)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: c.validator.format("Please enter no more than {0} characters."),
            minlength: c.validator.format("Please enter at least {0} characters."),
            rangelength: c.validator.format("Please enter a value between {0} and {1} characters long."),
            range: c.validator.format("Please enter a value between {0} and {1}."),
            max: c.validator.format("Please enter a value less than or equal to {0}."),
            min: c.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function() {
                function a(e) {
                    var f = c.data(this[0].form, "validator"),
                        g = "on" + e.type.replace(/^validate/, "");
                    f.settings[g] && f.settings[g].call(f, this[0], e)
                }
                this.labelContainer = c(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || c(this.currentForm);
                this.containers = c(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var b = this.groups = {};
                c.each(this.settings.groups, function(e, f) {
                    c.each(f.split(/\s/), function(g, h) {
                        b[h] = e
                    })
                });
                var d = this.settings.rules;
                c.each(d, function(e, f) {
                    d[e] = c.validator.normalizeRule(f)
                });
                c(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", a).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", a);
                this.settings.invalidHandler && c(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                this.checkForm();
                c.extend(this.submitted, this.errorMap);
                this.invalid = c.extend({}, this.errorMap);
                this.valid() || c(this.currentForm).triggerHandler("invalid-form", [this]);
                this.showErrors();
                return this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(a) {
                this.lastElement = a = this.validationTargetFor(this.clean(a));
                this.prepareElement(a);
                this.currentElements = c(a);
                var b = this.check(a);
                if (b) delete this.invalid[a.name];
                else this.invalid[a.name] = true;
                if (!this.numberOfInvalids()) this.toHide = this.toHide.add(this.containers);
                this.showErrors();
                return b
            },
            showErrors: function(a) {
                if (a) {
                    c.extend(this.errorMap, a);
                    this.errorList = [];
                    for (var b in a) this.errorList.push({
                        message: a[b],
                        element: this.findByName(b)[0]
                    });
                    this.successList = c.grep(this.successList, function(d) {
                        return !(d.name in a)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                c.fn.resetForm && c(this.currentForm).resetForm();
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b = 0,
                    d;
                for (d in a) b++;
                return b
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return this.size() == 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    c(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (a) {}
            },
            findLastActive: function() {
                var a = this.lastActive;
                return a && c.grep(this.errorList, function(b) {
                    return b.element.name == a.name
                }).length == 1 && a
            },
            elements: function() {
                var a = this,
                    b = {};
                return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    !this.name && a.settings.debug && window.console && console.error("%o has no name assigned", this);
                    if (this.name in b || !a.objectLength(c(this).rules())) return false;
                    return b[this.name] = true
                })
            },
            clean: function(a) {
                return c(a)[0]
            },
            errors: function() {
                return c(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = c([]);
                this.toHide = c([]);
                this.currentElements = c([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset();
                this.toHide = this.errorsFor(a)
            },
            check: function(a) {
                a = this.validationTargetFor(this.clean(a));
                var b = c(a).rules(),
                    d = false,
                    e;
                for (e in b) {
                    var f = {
                        method: e,
                        parameters: b[e]
                    };
                    try {
                        var g = c.validator.methods[e].call(this, a.value.replace(/\r/g, ""), a, f.parameters);
                        if (g == "dependency-mismatch") d = true;
                        else {
                            d = false;
                            if (g == "pending") {
                                this.toHide = this.toHide.not(this.errorsFor(a));
                                return
                            }
                            if (!g) {
                                this.formatAndAdd(a, f);
                                return false
                            }
                        }
                    } catch (h) {
                        this.settings.debug && window.console && console.log("exception occured when checking element " +
                            a.id + ", check the '" + f.method + "' method", h);
                        throw h;
                    }
                }
                if (!d) {
                    this.objectLength(b) && this.successList.push(a);
                    return true
                }
            },
            customMetaMessage: function(a, b) {
                if (c.metadata) {
                    var d = this.settings.meta ? c(a).metadata()[this.settings.meta] : c(a).metadata();
                    return d && d.messages && d.messages[b]
                }
            },
            customMessage: function(a, b) {
                var d = this.settings.messages[a];
                return d && (d.constructor == String ? d : d[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (arguments[a] !== undefined) return arguments[a]
            },
            defaultMessage: function(a, b) {
                return this.findDefined(this.customMessage(a.name, b), this.customMetaMessage(a, b), !this.settings.ignoreTitle && a.title || undefined, c.validator.messages[b], "<strong>Warning: No message defined for " + a.name + "</strong>")
            },
            formatAndAdd: function(a, b) {
                var d = this.defaultMessage(a, b.method),
                    e = /\$?\{(\d+)\}/g;
                if (typeof d == "function") d = d.call(this, b.parameters, a);
                else if (e.test(d)) d = jQuery.format(d.replace(e, "{$1}"), b.parameters);
                this.errorList.push({
                    message: d,
                    element: a
                });
                this.errorMap[a.name] = d;
                this.submitted[a.name] = d
            },
            addWrapper: function(a) {
                if (this.settings.wrapper) a = a.add(a.parent(this.settings.wrapper));
                return a
            },
            defaultShowErrors: function() {
                for (var a = 0; this.errorList[a]; a++) {
                    var b = this.errorList[a];
                    this.settings.highlight && this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass);
                    this.showLabel(b.element, b.message)
                }
                if (this.errorList.length) this.toShow = this.toShow.add(this.containers);
                if (this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight) {
                    a = 0;
                    for (b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass)
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return c(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(a, b) {
                var d = this.errorsFor(a);
                if (d.length) {
                    d.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    d.attr("generated") && d.html(b)
                } else {
                    d = c("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(a),
                        generated: true
                    }).addClass(this.settings.errorClass).html(b || "");
                    if (this.settings.wrapper) d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, c(a)) : d.insertAfter(a))
                }
                if (!b && this.settings.success) {
                    d.text("");
                    typeof this.settings.success == "string" ? d.addClass(this.settings.success) : this.settings.success(d)
                }
                this.toShow = this.toShow.add(d)
            },
            errorsFor: function(a) {
                var b = this.idOrName(a);
                return this.errors().filter(function() {
                    return c(this).attr("for") == b
                })
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function(a) {
                if (this.checkable(a)) a = this.findByName(a.name).not(this.settings.ignore)[0];
                return a
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(a) {
                var b = this.currentForm;
                return c(document.getElementsByName(a)).map(function(d, e) {
                    return e.form == b && e.name == a && e || null
                })
            },
            getLength: function(a, b) {
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return c("option:selected", b).length;
                    case "input":
                        if (this.checkable(b)) return this.findByName(b.name).filter(":checked").length
                }
                return a.length
            },
            depend: function(a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : true
            },
            dependTypes: {
                "boolean": function(a) {
                    return a
                },
                string: function(a, b) {
                    return !!c(a, b.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(a) {
                return !c.validator.methods.required.call(this, c.trim(a.value), a) && "dependency-mismatch"
            },
            startRequest: function(a) {
                if (!this.pending[a.name]) {
                    this.pendingRequest++;
                    this.pending[a.name] = true
                }
            },
            stopRequest: function(a, b) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) this.pendingRequest = 0;
                delete this.pending[a.name];
                if (b && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
                    c(this.currentForm).submit();
                    this.formSubmitted = false
                } else if (!b && this.pendingRequest == 0 && this.formSubmitted) {
                    c(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false
                }
            },
            previousValue: function(a) {
                return c.data(a, "previousValue") || c.data(a, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(a, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            dateDE: {
                dateDE: true
            },
            number: {
                number: true
            },
            numberDE: {
                numberDE: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function(a, b) {
            a.constructor == String ? this.classRuleSettings[a] = b : c.extend(this.classRuleSettings, a)
        },
        classRules: function(a) {
            var b = {};
            (a = c(a).attr("class")) && c.each(a.split(" "), function() {
                this in c.validator.classRuleSettings && c.extend(b, c.validator.classRuleSettings[this])
            });
            return b
        },
        attributeRules: function(a) {
            var b = {};
            a = c(a);
            for (var d in c.validator.methods) {
                var e;
                if (e = d === "required" && typeof c.fn.prop === "function" ? a.prop(d) : a.attr(d)) b[d] = e;
                else if (a[0].getAttribute("type") === d) b[d] = true
            }
            b.maxlength && /-1|2147483647|524288/.test(b.maxlength) && delete b.maxlength;
            return b
        },
        metadataRules: function(a) {
            if (!c.metadata) return {};
            var b = c.data(a.form, "validator").settings.meta;
            return b ? c(a).metadata()[b] : c(a).metadata()
        },
        staticRules: function(a) {
            var b = {},
                d = c.data(a.form, "validator");
            if (d.settings.rules) b = c.validator.normalizeRule(d.settings.rules[a.name]) || {};
            return b
        },
        normalizeRules: function(a, b) {
            c.each(a, function(d, e) {
                if (e === false) delete a[d];
                else if (e.param || e.depends) {
                    var f = true;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!c(e.depends, b.form).length;
                            break;
                        case "function":
                            f = e.depends.call(b, b)
                    }
                    if (f) a[d] = e.param !== undefined ? e.param : true;
                    else delete a[d]
                }
            });
            c.each(a, function(d, e) {
                a[d] = c.isFunction(e) ? e(b) : e
            });
            c.each(["minlength", "maxlength", "min", "max"], function() {
                if (a[this]) a[this] = Number(a[this])
            });
            c.each(["rangelength", "range"], function() {
                if (a[this]) a[this] = [Number(a[this][0]), Number(a[this][1])]
            });
            if (c.validator.autoCreateRanges) {
                if (a.min && a.max) {
                    a.range = [a.min, a.max];
                    delete a.min;
                    delete a.max
                }
                if (a.minlength && a.maxlength) {
                    a.rangelength = [a.minlength, a.maxlength];
                    delete a.minlength;
                    delete a.maxlength
                }
            }
            a.messages && delete a.messages;
            return a
        },
        normalizeRule: function(a) {
            if (typeof a == "string") {
                var b = {};
                c.each(a.split(/\s/), function() {
                    b[this] = true
                });
                a = b
            }
            return a
        },
        addMethod: function(a, b, d) {
            c.validator.methods[a] = b;
            c.validator.messages[a] = d != undefined ? d : c.validator.messages[a];
            b.length < 3 && c.validator.addClassRules(a, c.validator.normalizeRule(a))
        },
        methods: {
            required: function(a, b, d) {
                if (!this.depend(d, b)) return "dependency-mismatch";
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return (a = c(b).val()) && a.length > 0;
                    case "input":
                        if (this.checkable(b)) return this.getLength(a, b) > 0;
                    default:
                        return c.trim(a).length > 0
                }
            },
            remote: function(a, b, d) {
                if (this.optional(b)) return "dependency-mismatch";
                var e = this.previousValue(b);
                this.settings.messages[b.name] || (this.settings.messages[b.name] = {});
                e.originalMessage = this.settings.messages[b.name].remote;
                this.settings.messages[b.name].remote = e.message;
                d = typeof d == "string" && {
                    url: d
                } || d;
                if (this.pending[b.name]) return "pending";
                if (e.old === a) return e.valid;
                e.old = a;
                var f = this;
                this.startRequest(b);
                var g = {};
                g[b.name] = a;
                c.ajax(c.extend(true, {
                    url: d,
                    mode: "abort",
                    port: "validate" + b.name,
                    dataType: "json",
                    data: g,
                    success: function(h) {
                        f.settings.messages[b.name].remote = e.originalMessage;
                        var j = h === true;
                        if (j) {
                            var i = f.formSubmitted;
                            f.prepareElement(b);
                            f.formSubmitted = i;
                            f.successList.push(b);
                            f.showErrors()
                        } else {
                            i = {};
                            h = h || f.defaultMessage(b, "remote");
                            i[b.name] = e.message = c.isFunction(h) ? h(a) : h;
                            f.showErrors(i)
                        }
                        e.valid = j;
                        f.stopRequest(b, j)
                    }
                }, d));
                return "pending"
            },
            minlength: function(a, b, d) {
                return this.optional(b) || this.getLength(c.trim(a), b) >= d
            },
            maxlength: function(a, b, d) {
                return this.optional(b) || this.getLength(c.trim(a), b) <= d
            },
            rangelength: function(a, b, d) {
                a = this.getLength(c.trim(a), b);
                return this.optional(b) || a >= d[0] && a <= d[1]
            },
            min: function(a, b, d) {
                return this.optional(b) || a >= d
            },
            max: function(a, b, d) {
                return this.optional(b) || a <= d
            },
            range: function(a, b, d) {
                return this.optional(b) || a >= d[0] && a <= d[1]
            },
            email: function(a, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a))
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            creditcard: function(a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9 -]+/.test(a)) return false;
                var d = 0,
                    e = 0,
                    f = false;
                a = a.replace(/\D/g, "");
                for (var g = a.length - 1; g >= 0; g--) {
                    e = a.charAt(g);
                    e = parseInt(e, 10);
                    if (f)
                        if ((e *= 2) > 9) e -= 9;
                    d += e;
                    f = !f
                }
                return d % 10 == 0
            },
            accept: function(a, b, d) {
                d = typeof d == "string" ? d.replace(/,/g, "|") : "png|jpe?g|gif";
                return this.optional(b) || a.match(RegExp(".(" + d + ")$", "i"))
            },
            equalTo: function(a, b, d) {
                d = c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    c(b).valid()
                });
                return a == d.val()
            }
        }
    });
    c.format = c.validator.format
})(jQuery);
(function(c) {
    var a = {};
    if (c.ajaxPrefilter) c.ajaxPrefilter(function(d, e, f) {
        e = d.port;
        if (d.mode == "abort") {
            a[e] && a[e].abort();
            a[e] = f
        }
    });
    else {
        var b = c.ajax;
        c.ajax = function(d) {
            var e = ("port" in d ? d : c.ajaxSettings).port;
            if (("mode" in d ? d : c.ajaxSettings).mode == "abort") {
                a[e] && a[e].abort();
                return a[e] = b.apply(this, arguments)
            }
            return b.apply(this, arguments)
        }
    }
})(jQuery);
(function(c) {
    !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && c.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        function d(e) {
            e = c.event.fix(e);
            e.type = b;
            return c.event.handle.call(this, e)
        }
        c.event.special[b] = {
            setup: function() {
                this.addEventListener(a, d, true)
            },
            teardown: function() {
                this.removeEventListener(a, d, true)
            },
            handler: function(e) {
                arguments[0] = c.event.fix(e);
                arguments[0].type = b;
                return c.event.handle.apply(this, arguments)
            }
        }
    });
    c.extend(c.fn, {
        validateDelegate: function(a, b, d) {
            return this.bind(b, function(e) {
                var f = c(e.target);
                if (f.is(a)) return d.apply(f, arguments)
            })
        }
    })
})(jQuery);
/*!
 * animsition v4.0.1
 * A simple and easy jQuery plugin for CSS animated page transitions.
 * http://blivesta.github.io/animsition
 * License : MIT
 * Author : blivesta (http://blivesta.com/)
 */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var n = "animsition",
        i = {
            init: function(a) {
                a = t.extend({
                    inClass: "fadeInNot",
                    outClass: "fadeOutNot",
                    inDuration: 0,
                    outDuration: 0,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingInner: "",
                    timeout: !1,
                    timeoutCountdown: 5e3,
                    onLoadEvent: !0,
                    browser: ["animation-duration", "-webkit-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body",
                    transition: function(t) {
                        window.location.href = t
                    }
                }, a), i.settings = {
                    timer: !1,
                    data: {
                        inClass: "animsition-in-class",
                        inDuration: "animsition-in-duration",
                        outClass: "animsition-out-class",
                        outDuration: "animsition-out-duration",
                        overlay: "animsition-overlay"
                    },
                    events: {
                        inStart: "animsition.inStart",
                        inEnd: "animsition.inEnd",
                        outStart: "animsition.outStart",
                        outEnd: "animsition.outEnd"
                    }
                };
                var o = i.supportCheck.call(this, a);
                if (!o && a.browser.length > 0 && (!o || !this.length)) return "console" in window || (window.console = {}, window.console.log = function(t) {
                    return t
                }), this.length || console.log("Animsition: Element does not exist on page."), o || console.log("Animsition: Does not support this browser."), i.destroy.call(this);
                var e = i.optionCheck.call(this, a);
                return e && i.addOverlay.call(this, a), a.loading && i.addLoading.call(this, a), this.each(function() {
                    var o = this,
                        e = t(this),
                        s = t(window),
                        r = t(document),
                        l = e.data(n);
                    l || (a = t.extend({}, a), e.data(n, {
                        options: a
                    }), a.timeout && i.addTimer.call(o), a.onLoadEvent && s.on("load." + n, function() {
                        i.settings.timer && clearTimeout(i.settings.timer), i["in"].call(o)
                    }), s.on("pageshow." + n, function(t) {
                        t.originalEvent.persisted && i["in"].call(o)
                    }), s.on("unload." + n, function() {}), r.on("click." + n, a.linkElement, function(n) {
                        n.preventDefault();
                        var a = t(this),
                            e = a.attr("href");
                        2 === n.which || n.metaKey || n.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && n.ctrlKey ? window.open(e, "_blank") : i.out.call(o, a, e)
                    }))
                })
            },
            addOverlay: function(n) {
                t(n.overlayParentElement).prepend('<div class="' + n.overlayClass + '"></div>')
            },
            addLoading: function(n) {
                t(n.loadingParentElement).append('<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>")
            },
            removeLoading: function() {
                var i = t(this),
                    a = i.data(n).options,
                    o = t(a.loadingParentElement).children("." + a.loadingClass);
                o.fadeOut().remove()
            },
            addTimer: function() {
                var a = this,
                    o = t(this),
                    e = o.data(n).options;
                i.settings.timer = setTimeout(function() {
                    i["in"].call(a), t(window).off("load." + n)
                }, e.timeoutCountdown)
            },
            supportCheck: function(n) {
                var i = t(this),
                    a = n.browser,
                    o = a.length,
                    e = !1;
                0 === o && (e = !0);
                for (var s = 0; o > s; s++)
                    if ("string" == typeof i.css(a[s])) {
                        e = !0;
                        break
                    }
                return e
            },
            optionCheck: function(n) {
                var a, o = t(this);
                return a = n.overlay || o.data(i.settings.data.overlay) ? !0 : !1
            },
            animationCheck: function(i, a, o) {
                var e = t(this),
                    s = e.data(n).options,
                    r = typeof i,
                    l = !a && "number" === r,
                    d = a && "string" === r && i.length > 0;
                return l || d ? i = i : a && o ? i = s.inClass : !a && o ? i = s.inDuration : a && !o ? i = s.outClass : a || o || (i = s.outDuration), i
            },
            "in": function() {
                var a = this,
                    o = t(this),
                    e = o.data(n).options,
                    s = o.data(i.settings.data.inDuration),
                    r = o.data(i.settings.data.inClass),
                    l = i.animationCheck.call(a, s, !1, !0),
                    d = i.animationCheck.call(a, r, !0, !0),
                    u = i.optionCheck.call(a, e),
                    c = o.data(n).outClass;
                e.loading && i.removeLoading.call(a), c && o.removeClass(c), u ? i.inOverlay.call(a, d, l) : i.inDefault.call(a, d, l)
            },
            inDefault: function(n, a) {
                var o = t(this);
                o.css({
                    "animation-duration": a + "ms"
                }).addClass(n).trigger(i.settings.events.inStart).animateCallback(function() {
                    o.removeClass(n).css({
                        opacity: 1
                    }).trigger(i.settings.events.inEnd)
                })
            },
            inOverlay: function(a, o) {
                var e = t(this),
                    s = e.data(n).options;
                e.css({
                    opacity: 1
                }).trigger(i.settings.events.inStart), t(s.overlayParentElement).children("." + s.overlayClass).css({
                    "animation-duration": o + "ms"
                }).addClass(a).animateCallback(function() {
                    e.trigger(i.settings.events.inEnd)
                })
            },
            out: function(a, o) {
                var e = this,
                    s = t(this),
                    r = s.data(n).options,
                    l = a.data(i.settings.data.outClass),
                    d = s.data(i.settings.data.outClass),
                    u = a.data(i.settings.data.outDuration),
                    c = s.data(i.settings.data.outDuration),
                    m = l ? l : d,
                    g = u ? u : c,
                    f = i.animationCheck.call(e, m, !0, !1),
                    v = i.animationCheck.call(e, g, !1, !1),
                    h = i.optionCheck.call(e, r);
                s.data(n).outClass = f, h ? i.outOverlay.call(e, f, v, o) : i.outDefault.call(e, f, v, o)
            },
            outDefault: function(a, o, e) {
                var s = t(this),
                    r = s.data(n).options;
                s.css({
                    "animation-duration": o + 1 + "ms"
                }).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                    s.trigger(i.settings.events.outEnd), r.transition(e)
                })
            },
            outOverlay: function(a, o, e) {
                var s = this,
                    r = t(this),
                    l = r.data(n).options,
                    d = r.data(i.settings.data.inClass),
                    u = i.animationCheck.call(s, d, !0, !0);
                t(l.overlayParentElement).children("." + l.overlayClass).css({
                    "animation-duration": o + 1 + "ms"
                }).removeClass(u).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                    r.trigger(i.settings.events.outEnd), l.transition(e)
                })
            },
            destroy: function() {
                return this.each(function() {
                    var i = t(this);
                    t(window).off("." + n), i.css({
                        opacity: 1
                    }).removeData(n)
                })
            }
        };
    t.fn.animateCallback = function(n) {
        var i = "animationend webkitAnimationEnd";
        return this.each(function() {
            var a = t(this);
            a.on(i, function() {
                return a.off(i), n.call(this)
            })
        })
    }, t.fn.animsition = function(a) {
        return i[a] ? i[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void t.error("Method " + a + " does not exist on jQuery." + n) : i.init.apply(this, arguments)
    }
});