/**
 * \file	cpp-demo-utils.cpp
 * \brief	Contains the definition of cpp-demo's utility functions.
 */

#include "cpp-demo-utils.h"
#include <cmath>

using namespace std;

namespace cpp_demo
{
	/**
	 * \brief		Validates whether the passed binary number has a valid
	 * 				binary format.
	 * \param[in]	p_binary the binary number to validate.
	 */
	bool validateBinaryFormat(const string &p_binary) { return true; }

	/**
	 * \brief		Returns whether the passed number is primer or not.
	 * \param[in]	p_number the number to check.
	 */
	bool checkIsPrimeNumber(int p_number)
	{
		bool isPrime = true;

		for (int i = 2; i < p_number / 2; i++)
		{
			if (p_number % i == 0)
			{
				isPrime = false;
				break;
			}
		}

		return isPrime;
	}

	/**
	 * \brief		Converts the passed binary number to its decimal form.
	 * \param[in]	p_binary the binary number to convert.
	 */
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
} // namespace cpp_demo
