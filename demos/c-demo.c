#include <stdio.h>
#include <math.h>

int convertBinaryToDecimal(long long p_binary);

int main()
{
	long long n;

	printf("Binary number to check: ");
	scanf("%lld", &n);

	int decimal = convertBinaryToDecimal(n);

	printf("%lld in binary = %d in decimal", n, decimal);

	return 0;
}

int convertBinaryToDecimal(long long p_binary)
{
	int decimal = 0, i = 0, remainder;

	while (p_binary != 0)
	{
		remainder = p_binary % 10;
		p_binary /= 10;
		decimal += remainder * pow(2, i);
		i++;
	}

	return decimal;
}
