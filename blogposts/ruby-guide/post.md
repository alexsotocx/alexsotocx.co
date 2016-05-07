# Ruby introduction
Ruby is programming object oriented language; it allows the programmer to code in a similar language to the English.
The next example shows the classic first program for the introduction for all programming languages
```ruby
# This a comment
def greet(name)
  puts "Hello #{name}"
end

# Ruby allows many ways to do the same thing
greet "Alex" # Check no parenthesis needed!
greet("Jeison")
greet("World!")
```
> A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.
> - [Ruby official page](https://www.ruby-lang.org/en/)

## Installing ruby
Ruby is very easy to install, there are several installers like [RVM](https://rvm.io/rvm/install) or [Ruby installer](http://rubyinstaller.org/). Since I'm on Linux computer I often preffer to install **Ruby** using **RVM** because it allows to have multiple version of ruby installed in the same machine. Open your terminal window and run:

```bash
\curl -sSL https://get.rvm.io | bash -s stable --ruby
#Check the version that you installed
ruby -v 
```

## Basic instructions
Now we have installed ruby, so let's move to the action. Let's show for every instruction it's code and explanation of it.

### Variables
Ruby is a no typed language, so there's no need to give a type to a variable like Java, C or C++ do, This gives a lot of flexibility. When creating a variable it allocates RAM memory to save the value, the same thing happens when changing a value. 

```ruby
identifier_var = 20 #Variable creation and allocated memory
identifier_var = 20 * 2 #Variable modification

#See there is no type, so no restriction to do something like
identifier_var = "Nice, I'm a string now" #It's not a number anymore

#Basic data types
bool_variable = true #Bool variables are true or false values
bool_variable = false #false value
#
integer_var = 1
decimal_var = 2.34
#
string_var = "Hola"
#
null_var = nil
```
### Operations
The operations in ruby are very similar to the other languages, they are expected to do what it operator represents. Let's check it out:
```ruby
integer_var = 1 # => 1
integer_var = 1 + 2 # => 3
integer_var = integer_var - 2 # => 2
integer_var = integer_var * 5 # => 10
integer_var = integer_var / 3 # => 3 since is an integer division
#####
true_bool = true
false_bool = (!true_bool) # negation is represented  by '!'
homework = true
sleep = false
homework_or_sleep = (homework or sleep) # true, the "or" operation gives true if at least one the operands is true, otherwise is false
homework_and_sleep = (homework and sleep) # false, the "and" operation gives true if all operands are true, otherwise is false
##########
_1_greater_than_2 = (1 > 2) #false
_2_greater_than_1 = (2 > 1) #true
_1_less_than_2 = (2 > 1) #true
_1_greater_or_equal_than_2 = (1 >= 2) #false
_1_less_than_or_equal_2 = (1 <= 2) #true
_1_equal_to_2  = (1 == 2) #false
_2_equal_to_2 = (2 == 2) #true
#The same operations can be applied to strings

#String operations
string = "Hello"
string = string + " word" # =>  Hello world
string = "I'm Alex and I'm #{20 + 2} years old" #String interpolation
 ```

### Conditionals
Conditionals are questions made with the program data, they are used to change the flow of the program. For example, if something happens do this otherwise to that other thing.
The conditionals in ruby are code blocks, so  they start with **if** and ends with the reserved word **end**
```ruby
a = 2
b = 3
if a > b #This expression must return a bool value
  puts "A is greater than B"
end

# You can control multiple conditions
if a > b
  puts "A is greater than B"
elsif a < b 
  puts "B is greater than A"
else # if no condition is meet
  puts "A and B are equal"
end
```

### Loops
Ruby has two basic loops, **for** and **while**. The **for** loop is commonly used for traverse an array or something with a specific amount of iterations, the **while** is a loop commonly used to iterate without limit or terminate it when the programmer indicate it
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

### Functions
The functions are code blocks that can be reused, they usually get parementers as input and execute some operations with them to return a result. Ruby always return a value in its functions, to return a value ruby use the sentence **return** or it takes the last executed line of code to return the value.

```ruby
def function_name(param_1, param_2) # returns nil
  puts "#{param_1} #{param_2}"
end

def add(a,b)
  return a + b
end

def substract(a,b)
  a - b #No need to call return
end
```

## Advanced instructions
### Arrays
The arrays are data structures that save its information sequentially. They are used to store multiple information in only one variable.
```ruby
array = [1, 2, 3, 4, 5]

array.each do |num|
  puts num # 1 ,2 , 3, 4, 5
end

puts array[1] # => 2 direct access to the information with index starting in 0
array[1] = 20
puts array[1] # => 20
```

### Hash
The hash are data structures that maps a key with a value. The **key** values can be of any type because they are transformed in to a number using a hash algorithm.
```ruby
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
Lambda are code blocks similar to functions, but they are data types and can be used as parameters in functions.
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

### Classes
Ruby can make custom classes to simulate the real world data, for example you can create a class named **user**.
```ruby
class User
  def initialize(name, email)
    @name = name
    @email = email
  end

  def login
    #Execute login
    return true
  end
end
```

## What is next?
## Gems
Ruby gems are libraries and plugins used to extend ruby.
Check this gems:
* Ruby on Rails, Framework web MVC.
* HttpParty, Wrapper to make http requests.
* Minitest, test mini framework


# About me
* **Name**: Alexander Soto
* **Email**: asoto@innventto.com
* **twitter**: [alexsotocx](https://www.twitter.com/alexsotocx)
* **Linkedin**: [Alvaro Alexander Soto Cardona](https://www.linkedin.com/in/alvaro-alexander-soto-cardona-374849108)
* **Company**: Innventto S.A.S

