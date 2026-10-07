// Builds an arbitrarily-deep reply tree (reply-to-a-reply-to-a-reply, no depth
// limit) from a FLAT list of rows that each have an id and a parentId. Prisma
// has no "include infinitely" option, so the pattern is: fetch every row for
// the thread in one flat query, then nest it in JS.
export function buildCommentTree<T extends { id: string; parentId: string | null }>(
  flat: T[],
): (T & { replies: (T & { replies: unknown[] })[] })[] {
  const byParent = new Map<string | null, T[]>();
  for (const c of flat) {
    const key = c.parentId;
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key)!.push(c);
  }

  function attach(parentId: string | null): any[] {
    return (byParent.get(parentId) ?? []).map((c) => ({ ...c, replies: attach(c.id) }));
  }

  return attach(null);
}
