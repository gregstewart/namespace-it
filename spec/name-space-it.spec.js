describe('Name space it', function () {
    beforeEach(function () {
        if (window.ns1) {
            delete window.ns1;
        }
    });

    it('should throw an error if no namespace is defined', function () {
        expect(function () {
            new NSI();
        }).toThrow(new Error('Namespace is required'));
    });

    it('should create a namespace object', function () {
        new NSI('ns1');

        expect(typeof window.ns1).toBe('object');
    });

    it('should create a multi level namespace object', function () {
        new NSI('ns1.ns2.ns3');

        expect(typeof window.ns1).toBe('object');
        expect(typeof window.ns1.ns2).toBe('object');
        expect(typeof window.ns1.ns2.ns3).toBe('object');
    });

    it('should mix in a custom object into the namespace created', function () {
        var closure = (function () {
            var i = 0;
            increment = function () {
                return ++i;
            };

            return increment;
        })();

        new NSI('ns1.wibble', closure);

        expect(window.ns1.wibble()).toBe(1);
    });

    it('should mix in a module into the namespace created', function () {
        var module = (function () {
            var self = this;
            this.i = 0;

            return {
                increment:function () {
                    ++self.i;
                    return self.i;
                },
                resetCounter:function () {
                    self.i = 0;
                },
                getCounter:function () {
                    return self.i;
                }
            };
        })();

        new NSI('ns1.wibble', module);

        expect(window.ns1.wibble.increment()).toBe(1);
        window.ns1.wibble.resetCounter();
        expect(window.ns1.wibble.getCounter()).toBe(0);
    });

    it('should be able to mix multiple objects', function() {
        var closure = (function () {
            var i = 0;
            increment = function () {
                return ++i;
            };

            return increment;
        })();
        var module = (function () {
            var self = this;
            this.i = 0;

            return {
                increment:function () {
                    ++self.i;
                    return self.i;
                },
                resetCounter:function () {
                    self.i = 0;
                },
                getCounter:function () {
                    return self.i;
                }
            };
        })();

        new NSI('ns1.wibble', closure);
        new NSI('ns1.wobble', module);

        expect(window.ns1.wibble()).toBe(1);
        expect(window.ns1.wobble.increment()).toBe(1);
    });

    it('should be able to mix in an object that has another object mixed in', function() {
        var closure = (function (x) {
            var i = 0;
            increment = function () {
                return ++i+x;
            };

            return increment;
        });
        var module = (function (closure) {
            var self = this;
            self.reference = new closure(2);

            return {
                increment: function () {
                    return self.reference();
                },
                resetCounter: function () {
                    self.reference = new closure(1);
                }
            };
        })(closure);

        new NSI('ns1.wobble', module);

        expect(window.ns1.wobble.increment()).toBe(3);
        expect(window.ns1.wobble.increment()).toBe(4);
        window.ns1.wobble.resetCounter();
        expect(window.ns1.wobble.increment()).toBe(2);
    })
});