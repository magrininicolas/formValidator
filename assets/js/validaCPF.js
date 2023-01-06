class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, ""),
    });
  }

  valida() {
    if (!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== "string") return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;
    this.geraNovoCpf();
    return this.novoCpf === this.cpfLimpo;
  }

  geraNovoCpf() {
    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const primeiroDigito = ValidaCPF.criaDigito(cpfParcial);
    const segundoDigito = ValidaCPF.criaDigito(cpfParcial + primeiroDigito);
    this.novoCpf = cpfParcial + primeiroDigito + segundoDigito;
  }

  static criaDigito(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
      ac += regressivo * Number(val);
      regressivo--;
      return ac;
    }, 0);
    const digito = 11 - (total % 11);
    return digito > 9 ? "0" : String(digito);
  }

  isSequencia() {
    return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
  }
}
