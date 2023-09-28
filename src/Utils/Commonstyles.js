/* eslint-disable prettier/prettier */
import Colors from './Colors';
export default {
  circularView: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldtextStyle: {
    color: Colors.darkblack,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputtextStyle: {
    color: Colors.mediumgrey,
    fontSize: 13,
    paddingHorizontal: 0,
    fontWeight: '400',
  },
  textinputtextStyle: {
    width: '90%',
    fontSize: 15,
    fontWeight: '400',
    height: 43,
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  buttonView: {
    width: '100%',
    height: 50,
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonViewInnerStyle: {
    width: '88%',
    height: 50,
    backgroundColor: Colors.darkblue,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonViewBorderStyle: {
    width: '60%',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.darkblue,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
