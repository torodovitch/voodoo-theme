#include "cpp-demo-utils.h"
#include <iostream>
#include <sstream>

using namespace std;
using namespace cpp_demo;

string formatOutput(long long p_binary, int p_decimal, bool p_isPrime);

int main()
{
	long long n;

	cout << "Binary number to check: ";
	cin >> n;

	int decimal = convertBinaryToDecimal(n);

	cout << formatOutput(n, decimal, checkIsPrimeNumber(decimal));

	return 0;
}

string formatOutput(long long p_binary, int p_decimal, bool p_isPrime)
{
	ostringstream stream;

	stream << " # " << p_binary << " (" << p_decimal << ") ";
	stream << (p_isPrime ? "is a prime number." : "is not a primer number.") << endl;

	return stream.str();
}
