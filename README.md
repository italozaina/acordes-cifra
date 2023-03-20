# Acordes Cifra

Exemplo de acordes gerados por javascript em canvas.

![Exemplo de acordes gerados](captura1.png)

Criando um acorde de Dó (C) conforme este exemplo ![exemplo c](exemplo-c.png).

```javascript
this.montaAcorde('C', 'X 3 2 0 1 0', '032010');
```

Sendo esta notação de texto **"X 3 2 0 1 0"** comum em cifras.

#### Atualmente contempla a criação:

* Grelha simples de acorde
* Digitação
* Número do dedo para digitação
* Pestanas simples

## TODO

* Criar biblioteca de acordes
* Leitura de cifra para apresentar acorde
* Transposição de acorde
```
1 2  3 4  5 6 7  8 9  1011 12
C C# D D# E F F# G G# A A# B
1 2  3 4  5 6 7  8 9  1011 12
C Db D Eb E F Gb G Ab A Bb B
```