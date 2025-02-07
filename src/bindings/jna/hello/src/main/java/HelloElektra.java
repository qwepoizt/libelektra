import org.libelektra.KDB;
import org.libelektra.KDBException;
import org.libelektra.Key;
import org.libelektra.KeySet;
import org.libelektra.plugin.Echo;

/** Simple hello world to see how Elektra can be used in Java. */
public class HelloElektra {

  public static void main(String[] args) {
    final Key key = Key.create("user:/hello_world", "Hello World");
    System.out.println(key); // to get name
    System.out.println(key.getString());

    final KeySet ks = KeySet.create(10, Key.create("user:/hello_world2", "Hello World2"), key);

    for (Key k : ks) {
      System.out.println("iter: " + k.getName() + " " + k.getString());
    }
    System.out.println(ks);

    final KeySet ks2 = ks.dup();
    ks2.copy(ks);
    System.out.println(ks2.size());
    ks2.append(ks);
    ks2.append(key);

    try (final KDB kdb = KDB.open(key)) {
      kdb.get(ks, key);
      Key k = ks.lookup(key).orElseThrow(AssertionError::new);
      System.out.println(k.getString());
    } catch (KDBException e) {
      System.out.println(e);
    }

    final Echo dp = new Echo();
    dp.open(ks, key);
    dp.get(ks, key);
    dp.close(key);

    final Key b = Key.create("user:/boolean", "true");
    System.out.println(b.getBoolean());
    b.setBoolean(false);
    System.out.println(b.getBoolean());

    Key n = Key.create("user:/weird\\/name///\\\\/is/\no/_\\\\problem");
    n.keyNameIterator().forEachRemaining(s -> System.out.println("itername: " + s));
  }
}
