/**
 * \file	cpp-demo-utils.h
 * \brief	Contains utility functions for the cpp-demo.
 */

#ifndef CPP_DEMO_UTILS_H_
#define CPP_DEMO_UTILS_H_

#include <string>

namespace cpp_demo
{
	bool validateBinaryFormat(const std::string &p_binary);
	bool checkIsPrimeNumber(int p_number);
	int convertBinaryToDecimal(long long p_binary);
} // namespace cpp_demo

#endif
