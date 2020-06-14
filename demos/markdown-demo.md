# Markdown Demo

`int convertBinaryToDecimal(long long p_binary);`

```
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
```

### Customize Vue configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
