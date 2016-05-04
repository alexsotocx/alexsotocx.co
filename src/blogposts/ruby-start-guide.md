# Introducción a Ruby
Ruby es un lenguaje imperativo orientado a objetos, permite programar de manera muy sencilla en lenguaje similar al inglés.
En el siguiente ejemplo se muestra el clásico ejemplo de introducción a todos los lenguajes de programación
```ruby
# Esto es un comentario
def saludar(nombre)
  puts "Hola #{nombre}"
end

# Muchas formas de hacer lo mismo
saludar "Alex"
saludar("Jeison")
saludar("Pipe")
```
> Ruby es un lenguaje de programación dinámico y de código abierto enfocado en la simplicidad y productividad. Su elegante sintaxis se siente natural al leerla y fácil al escribirla.
> - Página oficial de Ruby

## Instalación
Ruby es muy sencillo de instalar, hay gran cantidad de instaladores como [RVM](https://rvm.io/rvm/install), Instaladores de un click como [Página oficial de ruby]( https://www.ruby-lang.org/es/downloads/) entre otros. Generalmente prefiero **RVM**, ya que esta permite tener multiples versiones de Ruby y se instala con permisos del usuario actual que usa el sistema.

### RVM
```bash
\curl -sSL https://get.rvm.io | bash -s stable --ruby
```

## Instrucciones básicas de Ruby
Acontinuación se presentan las instrucciones básicas del lenguaje adicionando una explicación de que realiza cada instrucción.

### Creación, Asignación y Modificación
Ruby es un lenguaje no tipado, es decir, no es necesario dar un tipo a la variable como en Java y C/C++ permitiendo una gran flexibilidad y la desaparición de las clases abstractas. La creación de variables se refiere a la reserva en memoria(RAM) para guardar el valor. De igual forma la asignación y la modificación en Ruby es un cambio en la memoria a la que variable tiene como referencia.

```ruby
identificador_var = 20 #Creación y asignación de la variable
identificador_var = 20 * 2 #Modificación de la variable 

#Notese que no hay ningun tipo lo que permite
identificador_var = "Ya soy un string" #Antes era un número

###############################################################
#################Tipos de datos básicos########################
soy_bool = true #Falso o verdadero, en este caso verdadero
soy_bool = false #Ya no eres bool, eres falso
#
soy_entero = 1
soy_real = 2.34
#
soy_string = "Hola" #Notese que no hay caracteres pero se pueden simular
#
no_existo = nil #Valores vacios
```
### Operaciones
Las operaciones en ruby dependen de los tipos de datos, pero son bastante intiutivas ya que se espera que hagan lo que representan los operadores.
```ruby
  soy_entero = 1 # => 1
  soy_entero = 1 + 2 # => 3
  soy_entero = soy_entero - 2 # => 2
  soy_entero = soy_entero * 5 # => 10
  soy_entero = soy_entero / 3 # => 3, arroja 3 porque los operandos son enteros
  #####
  soy_bool = true
  ya_no_soy_bool = (!soy_bool) # La negación equivale al !
  trabajo = true
  duermo = false
  trabajo_o_duermo = (trabajo or duermo) # true el "o" es una conjunción de matemática, es true si por lo menos uno de los involucrados es true caso contrario sería false
  trabajo_y_duermo = (trabajo and duermo) # false el "y" es una disjunción de matemática, es true si los involucrados son verdaderos true caso contrario sería false
  trabajo_o_exclusivo_duermo = (trabajo ^ duermo) # true el o exclusivo.
  duermo = true
  trabajo_o_exclusivo_duermo = (trabajo ^ duermo) #false
  ##########
  _1_mayor_que_2 = (1 > 2) #false
  _2_mayor_que_1 = (2 > 1) #true
  _1_menor_que_2 = (2 > 1) #true
  _1_mayor_igual_2 = (1 >= 2) #false
  _1_menor_igual_2 = (1 <= 2) #true
  _1_igual_a_2  = (1 == 2) #false
  _2_igual_a_2 = (2 == 2) #true
  #Estas operaciones de comparación también aplican para Strings
  string = "Hola"
  string = string + " mundo" # =>  Hola Mundo
  string = "Soy Alex y tengo #{20 + 2} años" #Interpolación de Strings
 ```

### Condicionales
Los condicionales son preguntas que se hacen con los datos que se tienen en el programa para cambiar el flujo del mismo, por ejemplo si pasa esto y esto haga esto.
Los condicionales en ruby son bloques de código, es decir comienzan por una definición y terminan en un **end**.
```ruby
a = 2
b = 3
if a > b #Se puede hacer cualquier pregunta siempre y cuando retorne un bool o se puede evaluar a bool
  puts "A es mayor"
end

# También hay forma de tener encuenta muchos más casos
if a > b
  puts "A es mayor"
elsif a < b #Sino si b mayor que a
  puts "B es mayor"
else
  puts "A y B son iguales"
end
```

### Ciclos
Ruby tiene como la mayoría de lenguajes los lenguajes dos ciclos básicos como el **for** y el **while**. El for ejecuta todas las instrucciones programadas en el bloque teniendo un fin "asegurado" en cambio el while es un ciclo que puede o no terminar, dependiendo de las condiciones que el programador indique.
```ruby
#FOR
for i in 1..20
  puts i # 1 2 3 4 ... 19,20
end

#WHILE
i = 1
while i <= 20
  puts i # 1 2, 3 , 4 ... 20
  i += 1 # i = i + 1
end
#UNTIL == While not
i = 1
until i > 20
  puts i # 1 2, 3 , 4 ... 20
  i += 1
end
```

### Funciones
Las funciones son bloques de código que se pueden reutilizar, comunmente estas reciben parametros y ejecutan operaciones sobre estos devolviendo un resultado, Ruby siempre retorna un valor a si sea **nil**. Para retornar un valor en ruby simplemente se ejecuta la operación **return** o se especifica el valor en la última línea de código que se ejecuta.
```
def nombre_funcion(parametro_1, parametro_2) # Retorna vacio(nil)
  puts "#{parametro_1} #{parametro_2}"
end

def suma(a,b)
  return a + b
end

def resta(a,b)
  a - b #No es necesario el return
end
```

## Instrucciones avanzadas
### Vectores
Los vectores son estructuras de datos que permiten guardar datos en secuencia en una sola variable, estos permiten acceder a todas las posiciones de este.
```ruby
array = [1, 2, 3, 4, 5]

array.each do |num|
  puts num # 1 ,2 , 3, 4, 5
end

puts array[1] # => 2 acceso directo por indices comenzados desde 0 
array[1] = 20
puts array[1] # => 20
```

### Hash
Los Hash son estructuras de datos "parecidos a los vectores", estos relacionan un parejas de datos, es decir un valor A me entrega un Valor B. Los **valores A** pueden ser de cualquier tipo, ya que estos son convertidos a números por el algoritmo hash.
```
hash = {}
hash[1] = 20
hash[20] = 2000
puts hash[1] #20
puts hash[2] #nil
puts hash[20] #2000

hash = {1 => 3, 2 => 5, 3 => 7, 4 => 11, 5 => 13}
hash.each do |key, value|
  puts "#{key} => #{value}" #1 => 3, 2 => 4 ....
end
```
### Lambda
Los lambda son bloques de código parecidos a las funciones, sin embargo estas son tipos de datos que pueden ser pasados a las funciones como parametros.
```ruby
l = lambda do |string|
  if string == "try"
    return "There's no such thing" 
  else
    return "Do or do not."
  end
end
puts l.call("try")
```
# ¿Qué sigue?
## Gemas
Una gema en ruby son librerias, plugins, etc que te permiten ampliar la funcionalidad neta de ruby. las más populares son:
* Ruby on Rails, Framework web MVC.
* HttpParty, Wrapper para hacer peticiones web.
* Minitest, manejo de pruebas


# Acerca del autor
* **Nombre**: Alexander Soto
* **Correo**: asoto@innventto.com
* **twitter**: [alexsotocx](www.twitter.com/alexsotocx)
* **Linkedin**: [Alvaro Alexander Soto Cardona](https://www.linkedin.com/in/alvaro-alexander-soto-cardona-374849108)
* **Compañía**: Innventto S.A.S
