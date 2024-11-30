import { StyleSheet } from 'react-native';

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  backText: {
    fontSize: 18,
    color: '#00214E',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00214E',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 15,
    justifyContent: 'center',
    height: 40, 
    overflow: 'hidden',
    fontSize: '14'
  },

  footerText: {
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#2A6295',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default authStyles;
